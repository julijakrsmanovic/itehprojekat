
export interface Comment {
    id?: number,
    content: string,
    user?: User
}
export interface Message {
    id: number,
    userId1: number,
    userId2: number,
    senderId: number,
    content: string,
}

export interface Post {
    id: number,
    image: string,
    content: string,
    comments: Comment[],
    user?: User
}

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,
    image: string,
    rel1: Relationship[],
    rel2: Relationship[]

}

export interface Relationship {
    userId1: number,
    userId2: number,
    messages: Message[],
    status: 'pending' | 'accepted' | 'rejected'
}