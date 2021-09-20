import {MigrationInterface, QueryRunner} from "typeorm";

export class createRelationships1632166759487 implements MigrationInterface {
    name = 'createRelationships1632166759487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `relationship` (`userId1` int NOT NULL, `userId2` int NOT NULL, PRIMARY KEY (`userId1`, `userId2`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `relationship` ADD CONSTRAINT `FK_fc5b08020ee1e5323d262121e9b` FOREIGN KEY (`userId1`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `relationship` ADD CONSTRAINT `FK_45061168a5bd514acf035bfb75f` FOREIGN KEY (`userId2`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `relationship` DROP FOREIGN KEY `FK_45061168a5bd514acf035bfb75f`");
        await queryRunner.query("ALTER TABLE `relationship` DROP FOREIGN KEY `FK_fc5b08020ee1e5323d262121e9b`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `relationship`");
    }

}
