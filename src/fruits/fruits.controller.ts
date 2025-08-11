import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { Prisma } from '@prisma/client';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Post()
  create(@Body() createFruitDto: Prisma.fruitsCreateInput) {
    return this.fruitsService.create(createFruitDto);
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
  update(
    @Param('id') id: string,
    @Body() updateFruitDto: Prisma.fruitsUpdateInput,
  ) {
    return this.fruitsService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}
