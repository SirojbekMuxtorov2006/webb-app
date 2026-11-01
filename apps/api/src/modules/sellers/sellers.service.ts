import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(sellerId: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { id: sellerId },
      include: { balance: true },
    });

    if (!seller) {
      throw new NotFoundException('Seller profile not found.');
    }

    const [orderItemsCount, lowStockCount, recentOrderItems] = await Promise.all([
      this.prisma.orderItem.count({ where: { sellerId } }),
      this.prisma.product.count({ where: { sellerId, stock: { lte: 5 } } }),
      this.prisma.orderItem.findMany({
        where: { sellerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { order: true },
      }),
    ]);

    return {
      storeName: seller.storeName,
      storeSlug: seller.storeSlug,
      verificationStatus: seller.verificationStatus,
      rating: seller.rating,
      balance: seller.balance,
      metrics: {
        totalSales: seller.totalSales,
        totalOrders: orderItemsCount,
        lowStockAlerts: lowStockCount,
      },
      recentOrders: recentOrderItems,
    };
  }

  async getSellerProducts(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
      include: {
        images: true,
        category: true,
        variants: true,
      },
    });
  }

  async requestPayout(sellerId: string, amount: number, bankAccount: string, mfo: string) {
    const balance = await this.prisma.sellerBalance.findUnique({
      where: { sellerId },
    });

    if (!balance || balance.availableBalance < amount) {
      throw new BadRequestException('Insufficient available balance for this payout.');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.sellerBalance.update({
        where: { sellerId },
        data: {
          availableBalance: { decrement: amount },
          pendingBalance: { increment: amount },
        },
      });

      return tx.sellerPayout.create({
        data: {
          sellerId,
          amount,
          status: 'PENDING',
          bankAccount,
          mfo,
        },
      });
    });
  }
}
