import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/order.entity';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
