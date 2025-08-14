import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) return { items: [] };

    return this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            fruit: true,
          },
        },
      },
    });
  }

  async addToCart(userId: number, fruitId: number, quantity = 1) {
    if (!fruitId) {
      throw new BadRequestException('fruitId is required');
    }
    let cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        fruitId,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        fruitId,
        quantity,
      },
    });
  }

  async updateQuantity(userId: number, fruitId: number, quantity: number) {
    if (!fruitId) {
      throw new BadRequestException('fruitId is required');
    }
    if (quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        fruitId,
      },
    });

    if (!existingItem) {
      throw new NotFoundException('Item not found in cart');
    }

    return this.prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
    });
  }

  async removeFromCart(userId: number, fruitId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const result = await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id, fruitId },
    });

    if (result.count === 0) {
      throw new NotFoundException('Item not found in cart');
    }

    return { message: 'Deleted successfully' };
  }

  async removeMultipleItemsFromCart(userId: number, fruitIds: number[]) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const result = await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        fruitId: { in: fruitIds },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('No matching items found in cart');
    }

    return { message: 'deleted successfully', deletedCount: result.count };
  }
}
