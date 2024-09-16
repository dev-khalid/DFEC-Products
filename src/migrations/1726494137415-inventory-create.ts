import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryCreate1726494137415 implements MigrationInterface {
    name = 'InventoryCreate1726494137415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`quantity\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`quantity\` int NOT NULL`);
    }

}
