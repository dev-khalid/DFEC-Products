import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [],
  controllers: [ProductsController, CategoryController],
  providers: [CategoryService],
})
export class ProductsModule {}
