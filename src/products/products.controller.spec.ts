/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './schema/product.entity';
import { Currency, EntityStatus } from 'src/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  const productRepositoryToken = getRepositoryToken(Product);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: productRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    productRepository = moduleRef.get<Repository<Product>>(
      productRepositoryToken,
    );
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        currency: Currency.USD,
        imageUrl: 'image1.jpg',
        isActive: true,
        entityStatus: EntityStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
        inventory: null,
      };
      const result = [product];
      jest.spyOn(productRepository, 'find').mockResolvedValueOnce(result);
      expect(await productsController.getProducts()).toEqual(result);
    });
  });
});
