import {MigrationInterface, QueryRunner} from "typeorm";

export class setNullOnUserDeletePostAndComment1632324193376 implements MigrationInterface {
    name = 'setNullOnUserDeletePostAndComment1632324193376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `post` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `post` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
