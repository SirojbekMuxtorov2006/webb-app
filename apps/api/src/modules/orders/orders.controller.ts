import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Req() req: any, @Body() body: any) {
    return this.ordersService.createOrder(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-orders')
  getMyOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrderById(@Param('id') id: string, @Req() req: any) {
    return this.ordersService.getOrderById(id, req.user.id);
  }
}
