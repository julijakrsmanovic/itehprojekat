import {MigrationInterface, QueryRunner} from "typeorm";

export class addAcceptedToRelationship1632168040237 implements MigrationInterface {
    name = 'addAcceptedToRelationship1632168040237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `relationship` ADD `accepted` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_bc096b4e18b1f9508197cd98066`");
        await queryRunner.query("ALTER TABLE `message` CHANGE `senderId` `senderId` int NULL");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`");
        await queryRunner.query("ALTER TABLE `post` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_bc096b4e18b1f9508197cd98066`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `message` CHANGE `senderId` `senderId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `relationship` DROP COLUMN `accepted`");
    }

}
