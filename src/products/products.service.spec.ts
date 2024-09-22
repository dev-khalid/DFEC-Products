import { TestDatabaseModule } from 'src/test-database.module';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './schema/product.entity';
import { Currency, EntityStatus } from 'src/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  const productRepositoryToken = getRepositoryToken(Product);

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule],
      providers: [
        ProductsService,
        {
          provide: productRepositoryToken,
          useValue: Repository,
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productRepository = moduleRef.get<Repository<Product>>(
      productRepositoryToken,
    );
  }, 10 * 1000);

  beforeEach(async () => {
    await productRepository.query(`TRUNCATE TABLE "user" CASCADE;`);
  });

  it('should return all products', async () => {
    const product1 = await productRepository.save({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
      currency: Currency.USD,
      imageUrl: 'image1.jpg',
      isActive: true,
      entityStatus: EntityStatus.ACTIVE,
    });
    const product2 = await productRepository.save({
      name: 'Product 2',
      description: 'Product 2 description',
      price: 20,
      currency: Currency.EUR,
      imageUrl: 'image2.jpg',
      isActive: false,
      entityStatus: EntityStatus.ACTIVE,
    });

    const products = await productsService.getProducts();
    expect(products).toEqual([product1, product2]);
  });
});
