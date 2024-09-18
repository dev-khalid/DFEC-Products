import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './schema/category.entity';
import { EntityStatus } from 'src/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategory() {
    return await this.categoryRepository.find({
      relations: [
        'parentCategory',
        // 'parentCategory.parentCategory',
        // 'parentCategory.parentCategory.parentCategory',
        // How to make this dynamic?
      ],
    });
  }

  async getCategoryById(categoryId: number) {
    return await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
  }

  async createCategory(category: CreateCategoryDto) {
    const newEntry = this.categoryRepository.create(category);
    await this.categoryRepository.save(newEntry);
    return newEntry;
  }

  async updateCategory(categoryId: number, body: UpdateCategoryDto) {
    const entity = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!entity) {
      throw new Error(`Category with id ${categoryId} not found.`);
    }

    Object.assign(entity, body);
    await await this.categoryRepository.save(entity);
    return entity;
  }

  async deleteCategory(categoryId: number) {
    const entity = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    entity.entityStatus = EntityStatus.ARCHIVED;
    await this.categoryRepository.save(entity);
    return entity;
    // We will never delete a category
    // Instead we will archive it.
    // return await this.categoryRepository.delete({ id: categoryId });
  }
}
