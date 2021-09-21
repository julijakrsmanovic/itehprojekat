import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Message } from "../entity/Message";
import { Relationship } from "../entity/Relationship";
import { User } from "../entity/User";

export async function updateUser(req: Request, res: Response) {
    const user = (req.session as any).user as User;
    await getRepository(User).update(user.id, req.body);
    res.sendStatus(204);
}

export async function deleteUser(req: Request, res: Response) {
    const user = (req.session as any).user as User;
    if (!user.isAdmin) {
        res.status(400).send('Only admin can delete users');
    }
    const id = (req.params as any).id;
    await getRepository(User).delete(Number(id));
    res.sendStatus(204);
}

export async function sendFriendRequest(req: Request, res: Response) {
    const user = (req.session as any).user as User;
    const id = (req.params as any).id;

    await getRepository(Relationship).insert({
        status: 'pending',
        userId1: user.id,
        userId2: Number(id)
    })

    res.sendStatus(204);
}

export async function respondToRequest(req: Request, res: Response) {
    const userId = Number((req.params as any).id);
    const user = (req.session as any).user as User;

    await getRepository(Relationship).update({
        userId2: user.id,
        userId1: userId
    }, {
        status: req.body.accept ? 'accepted' : 'rejected'
    })
}
export async function sendMessage(req: Request, res: Response) {
    const userId = req.body.userId;
    const user = (req.session as any).user as User;

    const rel1 = await getRepository(Relationship).findOne({
        where: {
            userId1: userId,
            userId2: user.id
        }
    })
    if (rel1) {
        const insertResult = await getRepository(Message).insert({
            ...req.body,
            userId1: userId,
            userId2: user.id
        })
        res.json({
            id: insertResult.identifiers[0].id
        })
        return;
    }
    const rel2 = await getRepository(Relationship).findOne({
        where: {
            userId2: userId,
            userId1: user.id
        }
    })
    if (rel2) {
        const insertResult = await getRepository(Message).insert({
            ...req.body,
            userId2: userId,
            userId1: user.id
        })
        res.json({
            id: insertResult.identifiers[0].id
        })
        return;
    }
    res.sendStatus(404);
}
export async function getAllUsers(req: Request, res: Response) {


    res.json(await getRepository(User).find());

}