/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('fruits')
export class FruitsController {
  constructor(
    private readonly fruitsService: FruitsService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createFruitDto: Prisma.FruitCreateInput) {
    return this.fruitsService.create(createFruitDto);
  }

  // @Post('upload')
  // @UseGuards(AdminGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFruitImage(@UploadedFile() file: Express.Multer.File) {
  //   return this.supabaseService.uploadFile(
  //     'fruits',
  //     file.originalname,
  //     file.buffer,
  //     file.mimetype,
  //   );
  // }

  @Post('upload/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFruitImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.supabaseService.uploadFile(
      'fruits',
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    // 更新该 fruit 的 imageUrl
    return this.fruitsService.update(+id, { imageUrl });
  }

  @Get()
  findAll() {
    return this.fruitsService.findAll();
  }

  @Get('searchByName')
  searchByName(@Query('name') name: string) {
    return this.fruitsService.searchByName(name);
  }

  @Get('searchByOrigin')
  searchByOrigin(@Query('origin') origin: string) {
    return this.fruitsService.searchByOrigin(origin);
  }

  @Get('paginate')
  paginate(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.fruitsService.paginate(
      Number(page) || 1,
      Number(pageSize) || 10,
    );
  }

  @Get('sortByPrice')
  sortByPrice(@Query('order') order: 'asc' | 'desc' = 'asc') {
    return this.fruitsService.sortByPrice(order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateFruitDto: Prisma.FruitUpdateInput,
  ) {
    return this.fruitsService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}
