import { MigrationInterface, QueryRunner } from 'typeorm';

export class InventoryTable1726494671574 implements MigrationInterface {
  name = 'InventoryTable1726494671574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`inventory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`availableQuantity\` int NOT NULL DEFAULT '0', \`reservedQuantity\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`inventory\``);
  }
}
