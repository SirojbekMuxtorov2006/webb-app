import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPlatformStats() {
    const [usersCount, sellersCount, productsCount, ordersCount, totalGmv, pendingSellers] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.seller.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'COMPLETED' },
      }),
      this.prisma.seller.count({ where: { verificationStatus: 'PENDING' } }),
    ]);

    return {
      totalUsers: usersCount,
      totalSellers: sellersCount,
      totalProducts: productsCount,
      totalOrders: ordersCount,
      totalGmvUZS: totalGmv._sum.totalAmount || 0,
      pendingSellerVerifications: pendingSellers,
    };
  }

  async getPendingSellers() {
    return this.prisma.seller.findMany({
      where: { verificationStatus: 'PENDING' },
      include: { user: { select: { email: true, firstName: true, lastName: true, phone: true } } },
    });
  }

  async verifySeller(sellerId: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
    const seller = await this.prisma.seller.findUnique({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException('Seller not found.');

    return this.prisma.seller.update({
      where: { id: sellerId },
      data: { verificationStatus: status },
    });
  }

  async getAuditLogs() {
    return this.prisma.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true, firstName: true, role: true } } },
    });
  }
}
