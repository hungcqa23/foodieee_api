import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/carts/cart-item.entity';
import { Cart } from 'src/carts/cart.entity';
import { Course } from 'src/courses/course.entity';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async getNumberCurrentCart(user: User) {
    try {
      const numberCart = await this.cartRepository.findOneOrFail({
        where: { user } // Specify the condition
      });
      return numberCart.cartItemIds.length;
    } catch (error) {
      return 0;
    }
  }

  public async createCart(
    user: User,
    items: {
      courseId: number;
      quantity: number;
    }[]
  ) {
    const cartItemIds = await Promise.all(
      items.map(async item => {
        const course = await this.courseRepository.findOneOrFail({
          where: { id: item.courseId }
        });

        if (!course) {
          throw new Error(`Course with id ${item.courseId} not found`);
        }

        const cartItem = this.cartItemRepository.create({
          course,
          quantity: item.quantity
        });

        await this.cartItemRepository.save(cartItem);

        return cartItem.id;
      })
    );

    const foundCart = await this.cartRepository.findOneBy({ user: user });

    if (foundCart) {
      console.log('Found cart:', foundCart);
      foundCart.cartItemIds = cartItemIds;
      await this.cartRepository.save(foundCart);
      return foundCart;
    }

    const cart = this.cartRepository.create({ user, cartItemIds });
    const savedCart = await this.cartRepository.save(cart);

    return savedCart;
  }

  public async getCurrentCart(user: User) {
    const foundCart = await this.cartRepository.findOne({
      where: { user },
      relations: ['user']
    });

    if (foundCart) {
      // Fetch and populate CartItems with their Courses
      const cartItems = await this.cartItemRepository.find({
        where: { id: In(foundCart.cartItemIds) }, // Match IDs in cartItemIds
        relations: ['course'] // Include course relation
      });

      // Attach the populated cartItems to the foundCart
      return { ...foundCart, cartItems };
    }

    const cart = this.cartRepository.create({ user, cartItemIds: [] });

    return await this.cartRepository.save(cart);
  }
}
