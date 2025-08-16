/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from 'src/supabase/supabase.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('searchByName')
  searchByName(@Query('name') name: string) {
    return this.userService.searchByName(name);
  }

  @Get('paginate')
  paginate(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.userService.paginate(Number(page) || 1, Number(pageSize) || 10);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.supabaseService.uploadFile(
      'users',
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }
}
