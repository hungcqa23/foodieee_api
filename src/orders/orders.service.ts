import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/carts/cart-item.entity';
import { Cart } from 'src/carts/cart.entity';
import { Order, OrderStatus, PaymentType } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>
  ) {}

  public async getAllOrders(user: User, type?: OrderStatus) {
    if (user.role === 'admin') {
      return await this.orderRepository.find({
        where: { status: type },
        order: { createdAt: 'DESC' },
        relations: ['user', 'cartItems', 'cartItems.course']
      });
    }

    return await this.orderRepository.find({
      where: { user: { id: user.id }, status: type },
      order: { createdAt: 'DESC' },
      relations: ['user', 'cartItems', 'cartItems.course']
    });
  }

  public async createOrder(
    user: User,
    cartId: number,
    paymentMethod: PaymentType
  ) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId }
    });
    if (!cart) {
      throw new HttpException('Cart not found', 404);
    }

    if (cart.cartItemIds.length === 0) {
      throw new HttpException('Cart is empty', 404);
    }

    const cartItems = await Promise.all(
      cart.cartItemIds.map(async cartItemId => {
        const cartItem = await this.cartItemRepository.findOne({
          where: { id: cartItemId }
        });

        if (!cartItem) {
          throw new Error(`Cart item with ID ${cartItemId} not found`);
        }

        return cartItem;
      })
    );

    const newOrder = this.orderRepository.create({
      user,
      cartItems,
      paymentType: paymentMethod
    });

    const order = await this.orderRepository.save(newOrder);
    await this.cartRepository.update(
      {
        id: cartId
      },
      {
        cartItemIds: []
      }
    );
    return order;
  }
}
