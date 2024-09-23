import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './schema/category.entity';
import { Product } from './schema/product.entity';
import { ProductsService } from './products.service';
@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [ProductsController, CategoryController],
  providers: [CategoryService, ProductsService],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
