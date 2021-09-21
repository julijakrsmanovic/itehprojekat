
export interface Comment {
    id?: number,
    content: string,
    user: User
}
export interface Message {
    id: number,
    userId1: number,
    userId2: number,
    sender: User,
    content: string,
}

export interface Post {
    id: number,
    image: string,
    content: string,
    comments: Comment[],
    user: User
}

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,
    image: string,
}