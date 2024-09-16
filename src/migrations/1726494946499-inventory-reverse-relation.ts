import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryReverseRelation1726494946499 implements MigrationInterface {
    name = 'InventoryReverseRelation1726494946499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`inventoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_0d5b00db0b857ac0d8c4dd7243\` (\`inventoryId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0d5b00db0b857ac0d8c4dd7243\` ON \`product\` (\`inventoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0d5b00db0b857ac0d8c4dd72437\` FOREIGN KEY (\`inventoryId\`) REFERENCES \`inventory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0d5b00db0b857ac0d8c4dd72437\``);
        await queryRunner.query(`DROP INDEX \`REL_0d5b00db0b857ac0d8c4dd7243\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_0d5b00db0b857ac0d8c4dd7243\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`inventoryId\``);
    }

}
