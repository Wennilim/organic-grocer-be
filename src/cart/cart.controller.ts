import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Req() req: { user: { id: number } }) {
    console.log(req.user);
    return this.cartService.getCart(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addToCart(
    @Req() req: { user: { id: number } },
    @Body() dto: { fruitId: number; quantity?: number },
  ) {
    return this.cartService.addToCart(req.user.id, dto.fruitId, dto.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-quantity')
  updateQuantity(
    @Req() req: { user: { id: number } },
    @Body() dto: { fruitId: number; quantity: number },
  ) {
    return this.cartService.updateQuantity(
      req.user.id,
      dto.fruitId,
      dto.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  removeFromCart(
    @Req() req: { user: { id: number } },
    @Body() dto: { fruitId: number },
  ) {
    return this.cartService.removeFromCart(req.user.id, dto.fruitId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('removeMultiple')
  removeMultipleItemsFromCart(
    @Req() req: { user: { id: number } },
    @Body() dto: { fruitIds: Array<number> },
  ) {
    return this.cartService.removeMultipleItemsFromCart(
      req.user.id,
      dto.fruitIds,
    );
  }
}
