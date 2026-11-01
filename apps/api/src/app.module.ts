import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesController } from './modules/categories/categories.controller';
import { BrandsController } from './modules/brands/brands.controller';
import { CartModule } from './modules/cart/cart.module';
import { OrdersService } from './modules/orders/orders.service';
import { OrdersController } from './modules/orders/orders.controller';
import { PaymentsService } from './modules/payments/payments.service';
import { PaymentsController } from './modules/payments/payments.controller';
import { SellersService } from './modules/sellers/sellers.service';
import { SellersController } from './modules/sellers/sellers.controller';
import { AdminService } from './modules/admin/admin.service';
import { AdminController } from './modules/admin/admin.controller';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CartModule,
    AIModule,
  ],
  controllers: [
    CategoriesController,
    BrandsController,
    OrdersController,
    PaymentsController,
    SellersController,
    AdminController,
  ],
  providers: [
    OrdersService,
    PaymentsService,
    SellersService,
    AdminService,
  ],
})
export class AppModule {}
