import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
