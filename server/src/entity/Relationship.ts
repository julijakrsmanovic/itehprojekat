import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Message } from "./Message";
import { User } from "./User";


@Entity()
export class Relationship {

    @PrimaryColumn()
    userId1: number;

    @PrimaryColumn()
    userId2: number;

    @ManyToOne(t => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId1' })
    user1: User

    @ManyToOne(t => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId2' })
    user2: User

    @OneToMany(t => Message, m => m.relationship, { eager: true })
    messages: Message[]

    @Column()
    status: 'pending' | 'accepted' | 'rejected'
}