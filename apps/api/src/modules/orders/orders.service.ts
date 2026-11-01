import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, data: {
    customerName: string;
    customerPhone: string;
    deliveryMethod: string;
    deliveryAddress: {
      region: string;
      city: string;
      street: string;
      apartment?: string;
    };
    paymentMethod: string;
    couponCode?: string;
    notes?: string;
    items: {
      productId: string;
      variantId?: string;
      quantity: number;
    }[];
  }) {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item.');
    }

    // Fetch products
    const productIds = data.items.map(i => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: true },
    });

    let subtotal = 0;
    const orderItemsData: any[] = [];

    for (const item of data.items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product "${product.titleUz}".`);
      }

      const unitPrice = product.discountPrice || product.price;
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      orderItemsData.push({
        productId: product.id,
        sellerId: product.sellerId,
        variantId: item.variantId || null,
        productTitle: product.titleUz,
        productImage: product.images[0]?.url || '',
        quantity: item.quantity,
        unitPrice,
        totalPrice,
      });
    }

    let discountAmount = 0;
    if (data.couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: data.couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && coupon.validUntil > new Date()) {
        if (coupon.discountType === 'PERCENT') {
          discountAmount = (subtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        } else {
          discountAmount = coupon.discountValue;
        }
      }
    }

    const shippingFee = subtotal > 500000 ? 0 : 20000;
    const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
    const orderNumber = `UZM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          deliveryMethod: data.deliveryMethod || 'COURIER_STANDARD',
          paymentMethod: data.paymentMethod || 'CASH_ON_DELIVERY',
          paymentStatus: data.paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PENDING',
          status: 'PROCESSING',
          shippingFee,
          subtotal,
          discountAmount,
          totalAmount,
          trackingNumber,
          deliveryAddressJson: JSON.stringify(data.deliveryAddress),
          notes: data.notes,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      // Deduct stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            soldCount: { increment: item.quantity },
          },
        });
      }

      // Create shipment record
      await tx.shipment.create({
        data: {
          orderId: newOrder.id,
          trackingNumber,
          status: 'PROCESSING',
          deliveryMethod: data.deliveryMethod || 'COURIER_STANDARD',
          shippingAddressJson: JSON.stringify(data.deliveryAddress),
          courierName: 'Fargo Express Uzbekistan',
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        },
      });

      return newOrder;
    });

    return order;
  }

  async getMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });
  }

  async getOrderById(orderId: string, userId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        payments: true,
        shipments: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }
}
