import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Relationship } from "./Relationship";
import { User } from "./User";

@Entity()
export class Message {


    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    userId1: number;

    @PrimaryColumn()
    userId2: number;

    @Column()
    senderId: number;
    @ManyToOne(t => Relationship, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId1', referencedColumnName: 'userId1' })
    @JoinColumn({ name: 'userId2', referencedColumnName: 'userId2' })
    relationship: Relationship

    @ManyToOne(t => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @Column()
    content: string;
}