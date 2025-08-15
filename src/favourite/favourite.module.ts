import { Module } from '@nestjs/common';
import { FavouriteController } from 'src/favourite/favourite.controller';
import { FavouriteService } from 'src/favourite/favourite.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FavouriteController],
  providers: [FavouriteService, PrismaService],
})
export class FavouriteModule {}
