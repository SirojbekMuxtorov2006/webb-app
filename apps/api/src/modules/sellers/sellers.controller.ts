import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('sellers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SellersController {
  constructor(private sellersService: SellersService) {}

  @Roles('SELLER')
  @Get('dashboard')
  getDashboard(@Req() req: any) {
    return this.sellersService.getDashboard(req.user.sellerId);
  }

  @Roles('SELLER')
  @Get('products')
  getProducts(@Req() req: any) {
    return this.sellersService.getSellerProducts(req.user.sellerId);
  }

  @Roles('SELLER')
  @Post('payout-request')
  requestPayout(@Req() req: any, @Body() body: { amount: number; bankAccount: string; mfo: string }) {
    return this.sellersService.requestPayout(req.user.sellerId, body.amount, body.bankAccount, body.mfo);
  }
}
