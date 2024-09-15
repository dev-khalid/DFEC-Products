import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number; // Assuming a separate Product entity

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;
}
