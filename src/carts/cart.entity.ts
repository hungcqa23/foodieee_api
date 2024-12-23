import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn()
  @OneToOne(() => User, user => user.cart, { onDelete: 'CASCADE' })
  user: User;

  @Column('int', { array: true, nullable: true })
  cartItemIds: number[];
}
