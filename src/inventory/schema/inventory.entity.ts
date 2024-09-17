import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Product } from '../../products/schema/product.entity';

@Entity()
export class Inventory{
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  quantity: number;

  @Column({ default: 0 })
  availableQuantity: number;

  @Column({ default: 0 })
  reservedQuantity: number;

  @OneToOne(() => Product, (product => product.inventory))
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
