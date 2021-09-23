import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";



export async function createPost(req: Request, res: Response) {

    const user = (req.session as any).user as User;
    const data = req.body;
    const insertResult = await getRepository(Post).insert({ ...data, user: user })

    res.json({
        id: insertResult.identifiers[0].id
    })
}

export async function deletePost(req: Request, res: Response) {
    const id = Number((req.params as any).id);

    await getRepository(Post).delete(id);

    res.sendStatus(204);
}

export async function createComment(req: Request, res: Response) {
    const postId = Number((req.params as any).id);
    const user = (req.session as any).user as User;

    const post = await getRepository(Post).findOne(postId);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const rel = [...(post.user?.rel1 || []), ...(post.user.rel2 || [])];
    if (rel.find(r => r.userId1 === user.id || r.userId2 === user.id) === undefined) {
        res.status(400).send('You are not friends with post author');
        return;
    }
    const insertResult = await getRepository(Comment).insert({
        ...req.body, post: {
            id: postId
        }, user: user
    })
    res.json({
        id: insertResult.identifiers[0].id
    })
}

export async function removeComment(req: Request, res: Response) {
    const postId = Number((req.params as any).id);
    const commentId = Number((req.params as any).comment);
    const comment = await getRepository(Comment).findOne({
        where: {
            id: commentId,
            post: {
                id: postId
            }
        }
    });
    const user = (req.session as any).user as User;
    if (!user.isAdmin && comment?.user?.id !== user.id) {
        res.status(400).send('You cannot delete this comment')
        return;
    }
    await getRepository(Comment).delete({

        id: commentId,
        post: {
            id: postId
        }

    })
    res.sendStatus(204);
}

export async function getAllPosts(req: Request, res: Response) {

    const user = (req.session as any).user as User;
    if (user.isAdmin) {
        res.json(await getRepository(Post).find());
        return;
    }
    const posts = await getRepository(Post).find();
    const rel = [...user.rel2, ...user.rel1]
    const filtered = posts.filter(post => {
        return post.user?.id === user?.id || rel.find(r => r.userId1 === post.user?.id || r.userId2 === post.user?.id) !== undefined;
    })
    res.json(filtered);
}