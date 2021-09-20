import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted'
import { Relationship } from "./Relationship";


@Entity()
export class User {


    @PrimaryGeneratedColumn()
    id?: number;


    @Column()
    firstName: string;

    @Column()
    lastName: string;


    @Column()
    email: string

    @Column()
    isAdmin: boolean

    @Column()
    image: string;

    @Column({
        select: false,
        transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    password: string

    @OneToMany(t => Relationship, r => r.user1, { eager: true })
    rel1: Relationship[]

    @OneToMany(t => Relationship, r => r.user2, { eager: true })
    rel2: Relationship[]
}