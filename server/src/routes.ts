import { createComment, createPost, deletePost, getAllPosts, removeComment } from "./handlers/postHandlers";
import { deleteUser, getAllUsers, respondToRequest, sendFriendRequest, sendMessage, updateUser } from "./handlers/userHandler";
import { renameFile, uplaodMiddleware } from "./util";


export interface Route {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    route: string,
    action: any[]
}

export const Routes: Route[] = [{
    method: 'get',
    route: '/post',
    action: [getAllPosts]
}, {
    method: 'get',
    route: "/user",
    action: [getAllUsers]
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
}, {
    method: 'patch',
    route: '/user',
    action: [uplaodMiddleware, renameFile('image'), updateUser]
}, {
    method: 'delete',
    route: '/user/:id',
    action: [deleteUser]
}, {
    method: 'post',
    route: '/relationsip',
    action: [sendFriendRequest]
}, {
    method: 'patch',
    route: '/relationsip/:id',
    action: [respondToRequest]
}, {
    method: 'post',
    route: '/message',
    action: [sendMessage]
}];