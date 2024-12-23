import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches
} from 'class-validator';
import { Cart } from 'src/carts/cart.entity';
import { Order } from 'src/orders/order.entity';
import { Review } from 'src/reviews/review.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

// Define the Role enum
export enum Role {
  USER = 'user',
  STAFF = 'staff',
  ADMIN = 'admin'
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  fullName: string;

  @Column({ nullable: true })
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be a valid 10-digit number'
  })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long'
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  @IsEnum(Role, { message: 'Role must be either "user" or "admin"' })
  role: string;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToOne(() => Cart, cart => cart.user)
  cart: Cart; // Establishes a one-to-one relationship with the Cart entity\

  @OneToMany(() => Order, order => order.user)
  orders: Order[]; // A user can place multiple orders

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
