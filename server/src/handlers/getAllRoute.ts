

import { Request, Response } from "express";
import { getRepository, ObjectType } from "typeorm";


export default function getAllRoute<T>(ent: ObjectType<T>) {
    return async function (req: Request, res: Response) {
        res.json(await getRepository(ent).find());
    }
}