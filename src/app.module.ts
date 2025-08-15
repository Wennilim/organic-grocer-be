import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { FruitsModule } from 'src/fruits/fruits.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { FavouriteService } from './favourite/favourite.service';
import { FavouriteController } from './favourite/favourite.controller';
import { FavouriteModule } from './favourite/favourite.module';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FruitsModule,
    PrismaModule,
    AuthModule,
    AdminAuthModule,
    UserModule,
    CartModule,
    FavouriteModule,
    OrderModule,
  ],
  controllers: [AppController, FavouriteController],
  providers: [
    AppService,
    PrismaService,
    AdminAuthService,
    FavouriteService,
    OrderService,
  ],
})
export class AppModule {}
