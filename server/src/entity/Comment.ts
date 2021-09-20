import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";


@Entity()
export class Comment {


    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    content: string;

    @ManyToOne(t => User, { eager: true })
    user: User

    @ManyToOne(t => Post, { primary: true, onDelete: 'CASCADE' })
    post: Post
}