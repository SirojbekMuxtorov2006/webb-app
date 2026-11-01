import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      return { items: [], subtotal: 0, shippingFee: 0, total: 0 };
    }

    let cart = await this.prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isThumbnail: true } },
                seller: { select: { storeName: true } },
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId: userId || null,
          sessionId: sessionId || null,
        },
        include: { items: { include: { product: { include: { images: true, seller: true } }, variant: true } } },
      });
    }

    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.variant?.discountPrice || item.variant?.price || item.product.discountPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const shippingFee = subtotal > 0 && subtotal < 500000 ? 20000 : 0; // Free shipping over 500,000 UZS
    const total = subtotal + shippingFee;

    return {
      id: cart.id,
      items: cart.items,
      subtotal,
      shippingFee,
      total,
    };
  }

  async addItem(userId: string | undefined, sessionId: string | undefined, productId: string, variantId?: string, quantity: number = 1) {
    let cart = await this.prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId: userId || null,
          sessionId: sessionId || null,
        },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId || null,
      },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
          quantity,
        },
      });
    }

    return this.getCart(userId, sessionId);
  }

  async updateItemQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      await this.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }
  }

  async removeItem(cartItemId: string) {
    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  async clearCart(userId?: string, sessionId?: string) {
    const cart = await this.prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
    });
    if (cart) {
      await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
  }
}
