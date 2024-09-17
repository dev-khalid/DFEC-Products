import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Product } from './product.entity';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true, description: 'Category name' })
  @Column()
  name: string;

  @ApiPropertyOptional({ description: 'Category description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ type: Boolean, default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Category })
  @ApiResponseProperty({ type: Category })
  @OneToOne(() => Category)
  parentCategory: Category; // One category can have only one parent...

  @ApiPropertyOptional({ type: [Product] })
  @ApiResponseProperty({ type: [Product] })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[]; // One category can have multiple products...
}
