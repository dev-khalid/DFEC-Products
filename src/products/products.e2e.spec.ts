// import { TestDatabaseModule } from 'src/test-database.module';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './schema/product.entity';
import { Currency, EntityStatus } from 'src/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { testDbConfig } from 'src/config';
import { ProductsModule } from './products.module';
import { INestApplication } from '@nestjs/common';
import { Category } from './schema/category.entity';
import { Inventory } from 'src/inventory/schema/inventory.entity';

describe('ProductsService', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  const productRepositoryToken = getRepositoryToken(Product);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testDbConfig),
        TypeOrmModule.forFeature([Product, Category, Inventory]),
        ProductsModule,
      ],
      providers: [
        ProductsService,
        {
          provide: productRepositoryToken,
          useValue: Repository,
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    productsService = moduleRef.get<ProductsService>(ProductsService);
    productRepository = moduleRef.get<Repository<Product>>('ProductRepository');
  });

  beforeEach(async () => {
    await productRepository.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await productRepository.query(`TRUNCATE TABLE inventory;`);
    await productRepository.query(`TRUNCATE TABLE product;`);
    await productRepository.query(`TRUNCATE TABLE category;`);
    await productRepository.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  });

  it('should return all products', async () => {
    const product1 = await productRepository.save(
      productRepository.create({
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        currency: Currency.USD,
        imageUrl: 'image1.jpg',
        isActive: true,
        entityStatus: EntityStatus.ACTIVE,
      }),
    );
    const product2 = await productRepository.save(
      productRepository.create({
        name: 'Product 2',
        description: 'Product 2 description',
        price: 20,
        currency: Currency.EUR,
        imageUrl: 'image2.jpg',
        isActive: false,
        entityStatus: EntityStatus.ACTIVE,
      }),
    );

    const products = (await productsService.getProducts()).map((product) => {
      delete product.category;
      return product;
    });

    expect(products).toEqual([product1, product2]);
    expect(products).toHaveLength(2);
  });

  afterAll(async () => await app.close());
});
