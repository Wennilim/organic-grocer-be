import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { FruitsModule } from 'src/fruits/fruits.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FruitsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
