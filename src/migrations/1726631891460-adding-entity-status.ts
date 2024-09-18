import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEntityStatus1726631891460 implements MigrationInterface {
    name = 'AddingEntityStatus1726631891460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`entityStatus\` enum ('ACTIVE', 'INACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`entityStatus\` enum ('ACTIVE', 'INACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`inventory\` ADD \`entityStatus\` enum ('ACTIVE', 'INACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inventory\` DROP COLUMN \`entityStatus\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`entityStatus\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`entityStatus\``);
    }

}
