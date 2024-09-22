import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { envConfig, testDbConfig } from './config';
import { ProductsModule } from './products/products.module';
import { Product } from './products/schema/product.entity';
import { Category } from './products/schema/category.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(testDbConfig),
    TypeOrmModule.forFeature([Product, Category]),
    ProductsModule,
  ],
})
export class TestDatabaseModule {}
