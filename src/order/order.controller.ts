import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OrderService } from 'src/order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Req() req: { user: { id: number } }) {
    return this.orderService.createOrder(req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  cancelOrder(@Req() req: { user: { id: number } }, @Param('id') id: number) {
    return this.orderService.cancelOrder(req.user.id, Number(id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserOrder(
    @Req() req: { user: { id: number } },
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('sort') sort = 'createdAt:desc',
  ) {
    return this.orderService.getOrders({
      userId: req.user.id,
      page: +page,
      limit: +limit,
      sort,
    });
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  getAllOrders(
    @Query('userName') userName?: string,
    @Query('fruitName') fruitName?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('sort') sort = 'createdAt:desc',
  ) {
    return this.orderService.getOrders({
      userName,
      fruitName,
      page: +page,
      limit: +limit,
      sort,
    });
  }
}
