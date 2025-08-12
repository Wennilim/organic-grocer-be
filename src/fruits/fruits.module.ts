import { Module } from '@nestjs/common';
import { AdminAuthModule } from 'src/admin-auth/admin-auth.module';
import { FruitsController } from 'src/fruits/fruits.controller';
import { FruitsService } from 'src/fruits/fruits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AdminAuthModule],
  providers: [FruitsService],
  controllers: [FruitsController],
})
export class FruitsModule {}
