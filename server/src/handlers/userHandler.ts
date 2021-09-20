import { Request, Response } from "express";
import { getRepository } from "typeorm";
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

