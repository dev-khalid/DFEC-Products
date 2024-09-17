import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryRelation1726539186728 implements MigrationInterface {
    name = 'InventoryRelation1726539186728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0d5b00db0b857ac0d8c4dd7243\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`parentCategoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD UNIQUE INDEX \`IDX_9e5435ba76dbc1f1a0705d4db4\` (\`parentCategoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9e5435ba76dbc1f1a0705d4db4\` ON \`category\` (\`parentCategoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_9e5435ba76dbc1f1a0705d4db43\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_9e5435ba76dbc1f1a0705d4db43\``);
        await queryRunner.query(`DROP INDEX \`REL_9e5435ba76dbc1f1a0705d4db4\` ON \`category\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP INDEX \`IDX_9e5435ba76dbc1f1a0705d4db4\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`parentCategoryId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0d5b00db0b857ac0d8c4dd7243\` ON \`product\` (\`inventoryId\`)`);
    }

}
