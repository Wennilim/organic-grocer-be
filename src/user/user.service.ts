import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async searchByName(name: string) {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async paginate(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  findOne(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }
}
