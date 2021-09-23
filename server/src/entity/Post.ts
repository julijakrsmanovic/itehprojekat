import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";


@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column({ type: 'text' })
    content: string


    @OneToMany(t => Comment, c => c.post, { eager: true })
    comments: Comment[];

    @ManyToOne(t => User, { eager: true, nullable: true, onDelete: 'SET NULL' })
    user?: User
}