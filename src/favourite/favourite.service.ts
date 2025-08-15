import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouriteService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleFavourite(userId: number, fruitId: number) {
    const fruit = await this.prisma.fruit.findUnique({ where: { id: userId } });
    if (!fruit) throw new NotFoundException('Fruit not found');

    const existingFavourite = await this.prisma.favorite.findUnique({
      where: { userId_fruitId: { userId, fruitId } },
    });

    if (existingFavourite) {
      await this.prisma.favorite.delete({
        where: { userId_fruitId: { userId, fruitId } },
      });
      return { message: 'Removed from favourites' };
    } else {
      await this.prisma.favorite.create({
        data: { userId, fruitId },
      });
      return { message: 'Added to favourites' };
    }
  }

  async getFavourites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { fruit: true },
    });
  }
}
