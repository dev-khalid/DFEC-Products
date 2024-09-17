import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Inventory } from 'src/inventory/schema/inventory.entity';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true, description: 'Product name' })
  @Column()
  name: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ type: Number, required: true, description: 'Product price' })
  @Column()
  price: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty()
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

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
  })
  category: Category; // Many products to one category...

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @OneToOne(() => Inventory, (inventory) => inventory.product)
  @JoinColumn()
  inventory: Inventory;
}
