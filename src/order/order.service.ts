import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { fruit: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        items: {
          create: cart.items.map((item) => ({
            fruitId: item.fruitId,
            quantity: item.quantity,
            price: item.fruit.price,
          })),
        },
      },
      include: { items: { include: { fruit: true } } },
    });

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await this.prisma.cart.delete({
      where: { id: cart.id },
    });

    return order;
  }

  async cancelOrder(userId: number, orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order || order.userId !== userId)
      throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'Cancelled' },
    });
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { fruit: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrders(filters: {
    userId?: number;
    userName?: string;
    fruitName?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const { page = 1, limit = 10, sort = 'createdAt:desc' } = filters;

    const [sortField, sortOrder] = sort.split(':');
    const orderBy: Record<string, 'asc' | 'desc'> = {};
    orderBy[sortField] = sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const where: Prisma.OrderWhereInput = {
      userId: filters.userId,
      user: filters.userName
        ? {
            name: { contains: filters.userName, mode: 'insensitive' },
          }
        : undefined,
      items: filters.fruitName
        ? {
            some: {
              fruit: {
                name: { contains: filters.fruitName, mode: 'insensitive' },
              },
            },
          }
        : undefined,
    };

    const total = await this.prisma.order.count({ where });

    const data = await this.prisma.order.findMany({
      where,
      include: {
        user: true,
        items: { include: { fruit: true } },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }
}
