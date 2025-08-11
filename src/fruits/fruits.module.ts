import { Module } from '@nestjs/common';
import { FruitsController } from 'src/fruits/fruits.controller';
import { FruitsService } from 'src/fruits/fruits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FruitsService],
  controllers: [FruitsController],
})
export class FruitsModule {}
