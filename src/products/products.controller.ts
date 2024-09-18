import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.getProductById(productId);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, body);
  }

  @Delete(':id')
  deleteProduct(
    @Res() res: Response,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productsService.deleteProduct(res, productId);
  }
}
