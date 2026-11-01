import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initializePayment(orderId: string, method: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    const externalTransactionId = `${method}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let paymentUrl = '';
    if (method === 'PAYME') {
      // Base64 encoded Payme checkout URL
      const paymeParams = Buffer.from(`m=${process.env.PAYME_MERCHANT_ID || 'test_merchant'};ac.order_id=${order.id};a=${order.totalAmount * 100}`).toString('base64');
      paymentUrl = `https://checkout.paycom.uz/${paymeParams}`;
    } else if (method === 'CLICK') {
      paymentUrl = `https://my.click.uz/services/pay?service_id=${process.env.CLICK_SERVICE_ID || '12345'}&merchant_id=${process.env.CLICK_MERCHANT_ID || '67890'}&amount=${order.totalAmount}&transaction_param=${order.id}`;
    } else if (method === 'UZUM_NASIYA') {
      paymentUrl = `/checkout/uzum-nasiya-plan?orderId=${order.id}&amount=${order.totalAmount}`;
    } else {
      paymentUrl = `/checkout/success?orderNumber=${order.orderNumber}`;
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        method,
        status: method === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PENDING',
        amount: order.totalAmount,
        currency: 'UZS',
        externalTransactionId,
        paymentUrl,
      },
    });

    return {
      paymentId: payment.id,
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: order.totalAmount,
      method,
      paymentUrl,
    };
  }

  /**
   * Payme Merchant Webhook (JSON-RPC 2.0 implementation)
   */
  async handlePaymeWebhook(body: any) {
    const { method, params } = body;
    console.log('[Payme Webhook received]', method, params);

    if (method === 'CheckPerformTransaction') {
      return {
        result: {
          allow: true,
          additional: {
            description: 'Uzum Marketplace Order Payment',
          },
        },
      };
    }

    if (method === 'CreateTransaction') {
      return {
        result: {
          create_time: Date.now(),
          transaction: params.id,
          state: 1,
        },
      };
    }

    if (method === 'PerformTransaction') {
      // Mark payment as completed
      return {
        result: {
          transaction: params.id,
          perform_time: Date.now(),
          state: 2,
        },
      };
    }

    return { error: { code: -32601, message: 'Method not found' } };
  }

  /**
   * Click Merchant Webhook
   */
  async handleClickWebhook(body: any) {
    console.log('[Click Webhook received]', body);
    const { click_trans_id, service_id, merchant_trans_id, amount, action, error } = body;

    if (Number(action) === 0) {
      // Prepare
      return {
        click_trans_id,
        merchant_trans_id,
        merchant_prepare_id: 1,
        error: 0,
        error_note: 'Success',
      };
    }

    if (Number(action) === 1) {
      // Complete
      return {
        click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: 1,
        error: 0,
        error_note: 'Success',
      };
    }

    return { error: -8, error_note: 'Unknown action' };
  }

  /**
   * Simulation / Sandbox confirm for demo testing
   */
  async sandboxConfirmPayment(orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found.');

    await this.prisma.$transaction([
      this.prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'COMPLETED', status: 'PAID' },
      }),
      this.prisma.payment.updateMany({
        where: { orderId },
        data: { status: 'COMPLETED' },
      }),
    ]);

    return { success: true, message: 'Payment successfully simulated as COMPLETED.' };
  }
}
