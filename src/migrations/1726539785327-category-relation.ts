import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryRelation1726539785327 implements MigrationInterface {
  name = 'CategoryRelation1726539785327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_9e5435ba76dbc1f1a0705d4db43\` FOREIGN KEY (\`parentCategoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_9e5435ba76dbc1f1a0705d4db43\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`,
    );
  }
}
