import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/cart.entity';
import { CartItem } from 'src/carts/cart-item.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    CoursesModule,
    UsersModule
  ],
  exports: [CartsService, TypeOrmModule],
  providers: [CartsService],
  controllers: [CartsController]
})
export class CartsModule {}
