import { OmitType, PartialType } from '@nestjs/swagger';
import { Category } from '../schema/category.entity';

export class CreateCategoryDto extends OmitType(Category, []) {}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
