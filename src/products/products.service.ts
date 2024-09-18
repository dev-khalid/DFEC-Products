import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './schema/product.entity';
import { Repository, Not } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { EntityStatus } from 'src/common';
import { Response } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts() {
    return await this.productRepository.find({
      where: { entityStatus: EntityStatus.ACTIVE },
      relations: ['category'],
    });
  }

  async getProductById(productId: number) {
    return await this.productRepository.findOne({
      where: { id: productId, entityStatus: EntityStatus.ACTIVE },
      relations: ['category'],
    });
  }

  async createProduct(product: CreateProductDto) {
    const newEntity = this.productRepository.create(product);
    return await this.productRepository.save(newEntity);
    // return newEntity;
  }

  async updateProduct(productId: number, product: UpdateProductDto) {
    const productEntity = await this.productRepository.findOne({
      where: { id: productId, entityStatus: EntityStatus.ACTIVE },
      relations: ['category'],
    });
    if (!productEntity) {
      return new NotFoundException(`Product with id ${productId} not found.`);
    }

    Object.assign(productEntity, product);

    await this.productRepository.save(productEntity);
    return productEntity;
  }

  async deleteProduct(res: Response, productId: number) {
    const entity = await this.productRepository.findOne({
      where: { id: productId, entityStatus: Not(EntityStatus.ARCHIVED) },
    });

    if (!entity) {
      throw new NotFoundException(`Product with id ${productId} not found.`);
    }

    entity.entityStatus = EntityStatus.ARCHIVED;
    await this.productRepository.save(entity);
    return res.status(204).end();
    // await this.productRepository.delete({ id: productId });
  }
}
