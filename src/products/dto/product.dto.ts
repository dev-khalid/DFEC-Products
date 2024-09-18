import { OmitType, PartialType } from '@nestjs/swagger';
import { Product } from '../schema/product.entity';

export class CreateProductDto extends OmitType(Product, []) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
