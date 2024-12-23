import { CartItem } from 'src/carts/cart-item.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum PaymentType {
  CASH = 'cash',
  ZALO = 'zalo'
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.order)
  @JoinColumn()
  cartItems: CartItem[];

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.CASH
  })
  paymentType: PaymentType;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
