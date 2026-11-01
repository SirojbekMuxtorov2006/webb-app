import { Controller, Get, Post, Put, Delete, Body, Param, Req, Headers } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Headers('x-session-id') sessionId: string, @Req() req: any) {
    const userId = req.user?.id;
    return this.cartService.getCart(userId, sessionId);
  }

  @Post('items')
  addItem(
    @Headers('x-session-id') sessionId: string,
    @Req() req: any,
    @Body() body: { productId: string; variantId?: string; quantity?: number },
  ) {
    const userId = req.user?.id;
    return this.cartService.addItem(userId, sessionId, body.productId, body.variantId, body.quantity || 1);
  }

  @Put('items/:id')
  updateQuantity(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItemQuantity(id, body.quantity);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete()
  clearCart(@Headers('x-session-id') sessionId: string, @Req() req: any) {
    const userId = req.user?.id;
    return this.cartService.clearCart(userId, sessionId);
  }
}
