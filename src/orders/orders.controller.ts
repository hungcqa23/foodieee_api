import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/common/guards/jwt-access-token.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { OrderStatus, PaymentType } from 'src/orders/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @UseGuards(JwtAccessTokenGuard)
  @Get()
  public async createOrder(
    @Req() req: RequestWithUser,
    @Query('type') type?: OrderStatus
  ) {
    const { user } = req;

    const data = await this.ordersService.getAllOrders(user, type);
    return {
      status: 'success',
      data
    };
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  public async getAllOrders(
    @Req() req: RequestWithUser,
    @Body()
    body: {
      cartId: number;
      paymentMethod: PaymentType;
    }
  ) {
    const { user } = req;
    const data = await this.ordersService.createOrder(
      user,
      body.cartId,
      body.paymentMethod
    );

    return {
      status: 'success',
      data
    };
  }
}
