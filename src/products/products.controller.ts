import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(){}

  @Get()
  getProducts() {}

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) productId: number) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {}

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) productId: number, @Body() body: UpdateProductDto) {}

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) productId: number) {}
}