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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FruitsModule,
    PrismaModule,
    AuthModule,
    AdminAuthModule,
    UserModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AdminAuthService],
})
export class AppModule {}
