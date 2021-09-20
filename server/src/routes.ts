import { Request, Response } from "express";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import getAllRoute from "./handlers/getAllRoute";
import { createComment, createPost, deletePost, removeComment } from "./handlers/postHandlers";
import { renameFile, uplaodMiddleware } from "./util";


export interface Route {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    route: string,
    action: any[]
}

export const Routes: Route[] = [{
    method: 'get',
    route: '/post',
    action: [getAllRoute(Post)]
}, {
    method: 'get',
    route: "/user",
    action: [getAllRoute(User)]
}, {
    method: 'post',
    route: '/post',
    action: [uplaodMiddleware, renameFile('image'), createPost]
}, {
    method: 'patch',
    route: '/post/:id/comment',
    action: [createComment]
}, {
    method: 'delete',
    route: '/post/:id/comment/:comment',
    action: [removeComment]
}, {
    method: 'delete',
    route: '/post/:id',
    action: [deletePost]
}];