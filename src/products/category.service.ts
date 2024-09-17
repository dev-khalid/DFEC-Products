import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor() {}

  getAllCategory() {
    return 'Category service is working!';
  }

  getCategoryById(categoryId: number) {
    return `Category ID: ${categoryId}`;
  }

  createCategory(category: CreateCategoryDto) {
    return `New category created: ${JSON.stringify(category)}`;
  }

  updateCategory(categoryId: number, body: UpdateCategoryDto) {
    return `Category ID: ${categoryId} updated with: ${JSON.stringify(body)}`;
  }

  deleteCategory(categoryId: number) {
    return `Category ID: ${categoryId} deleted`;
  }
}
