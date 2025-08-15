import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FavouriteService } from './favourite.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('favourite')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Post('toggle')
  @UseGuards(JwtAuthGuard)
  toggleFavourite(
    @Req() req: { user: { id: number } },
    @Body() dto: { fruitId: number },
  ) {
    return this.favouriteService.toggleFavourite(req.user.id, dto.fruitId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getFavourites(@Req() req: { user: { id: number } }) {
    return this.favouriteService.getFavourites(req.user.id);
  }
}
