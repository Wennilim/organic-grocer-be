import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { FruitsModule } from 'src/fruits/fruits.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FruitsModule,
    PrismaModule,
    AuthModule,
    AdminAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AdminAuthService],
})
export class AppModule {}
