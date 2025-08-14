import { HttpException, Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FruitsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.FruitCreateInput) {
    try {
      return await this.prisma.fruit.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Fruit with this name already exists', 409);
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.fruit.findMany();
  }

  async searchByName(name: string) {
    return this.prisma.fruit.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async searchByOrigin(origin: string) {
    return this.prisma.fruit.findMany({
      where: {
        origin: {
          contains: origin,
          mode: 'insensitive',
        },
      },
    });
  }

  async paginate(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.fruit.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'asc' },
      }),
      this.prisma.fruit.count(),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  sortByPrice(@Query('order') order: 'asc' | 'desc' = 'asc') {
    return this.prisma.fruit.findMany({
      orderBy: {
        price: order,
      },
    });
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }

    return this.prisma.fruit.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.FruitUpdateInput) {
    return this.prisma.fruit.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.fruit.delete({ where: { id } });
  }
}
