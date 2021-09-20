import {MigrationInterface, QueryRunner} from "typeorm";

export class createPosts1632166525275 implements MigrationInterface {
    name = 'createPosts1632166525275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `image` varchar(255) NOT NULL, `content` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD `image` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `image`");
        await queryRunner.query("DROP TABLE `post`");
    }

}
