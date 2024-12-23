import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Course } from 'src/courses/course.entity'; // Replace with actual path
import { Order } from 'src/orders/order.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(() => Order, order => order.cartItems, { onDelete: 'SET NULL' })
  order: Order; // The order this cart item belongs to
}
