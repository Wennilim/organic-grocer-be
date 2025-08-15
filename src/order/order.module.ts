import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminAuthModule } from 'src/admin-auth/admin-auth.module';

@Module({
  imports: [PrismaModule, AdminAuthModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, JwtService],
})
export class OrderModule {}
