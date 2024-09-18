import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCurrency1726633888498 implements MigrationInterface {
    name = 'ProductCurrency1726633888498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`currency\` enum ('USD', 'CAD', 'EUR', 'GBP', 'INR', 'BDT') NOT NULL DEFAULT 'USD'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`currency\``);
    }

}
