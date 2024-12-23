import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartsService } from 'src/carts/carts.service';
import { JwtAccessTokenGuard } from 'src/common/guards/jwt-access-token.guard';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get('current-cart-number')
  public async getNumberCurrentCart(@Req() req: RequestWithUser) {
    const numberCart = await this.cartService.getNumberCurrentCart(req.user);

    return {
      status: 'success',
      data: numberCart
    };
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('current')
  public async getCurrentCart(@Req() req: RequestWithUser) {
    const cart = await this.cartService.getCurrentCart(req.user);

    return {
      status: 'success',
      data: cart
    };
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('')
  public async createCurrentCart(
    @Req() req: RequestWithUser,
    @Body()
    body: {
      items: { courseId: number; quantity: number }[];
    }
  ) {
    const cart = await this.cartService.createCart(req.user, body.items);

    return {
      status: 'success',
      data: cart
    };
  }
}
