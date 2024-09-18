import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.DB_PORT) || 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  migrations: ['dist/**/migrations/*{.ts,.js}'],
};
const connectionSource = new DataSource(dbConfig as DataSourceOptions);
export default connectionSource;
