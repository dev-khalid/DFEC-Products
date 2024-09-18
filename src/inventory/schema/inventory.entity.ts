import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from '../../products/schema/product.entity';
import { EntityStatus } from 'src/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';

@Entity()
export class Inventory {
  @ApiPropertyOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty({ default: 0 })
  @Column({ default: 0 })
  availableQuantity: number;

  @ApiProperty({ default: 0 })
  @Column({ default: 0 })
  reservedQuantity: number;

  @ApiProperty({ type: () => Product })
  @OneToOne(() => Product, (product) => product.inventory)
  product: Product;

  @ApiProperty({
    enum: EntityStatus,
    default: EntityStatus.ACTIVE,
  })
  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
  entityStatus: EntityStatus;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiPropertyOptional()
  @ApiResponseProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
