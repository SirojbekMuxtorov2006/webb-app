import { calculateInstallment, formatUZS } from '@ecommerce/shared';
import { PaymentsService } from '../src/modules/payments/payments.service';

describe('Payments & Installment Engine (Uzbekistan)', () => {
  let paymentsService: PaymentsService;
  const mockPrisma = {
    order: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    payment: {
      create: jest.fn(),
      updateMany: jest.fn(),
    },
    $transaction: jest.fn().mockImplementation((cb) => (Array.isArray(cb) ? Promise.all(cb) : cb(mockPrisma))),
  };

  beforeEach(() => {
    paymentsService = new PaymentsService(mockPrisma as any);
  });

  it('should correctly format Uzbek So\'m currency', () => {
    expect(formatUZS(1500000, 'uz')).toBe("1 500 000 so'm");
    expect(formatUZS(4499000, 'ru')).toBe('4 499 000 сум');
    expect(formatUZS(16800000, 'en')).toBe('16 800 000 UZS');
  });

  it('should accurately calculate Uzum Nasiya installment breakdown for 12 months', () => {
    const totalAmount = 4800000;
    const calc = calculateInstallment(totalAmount, 12, 24);

    expect(calc.totalInstallmentPrice).toBe(Math.round(4800000 * 1.24));
    expect(calc.monthlyPayment).toBe(Math.round(calc.totalInstallmentPrice / 12));
    expect(calc.markupAmount).toBe(calc.totalInstallmentPrice - totalAmount);
  });

  it('should handle Payme JSON-RPC 2.0 CheckPerformTransaction', async () => {
    const response = await paymentsService.handlePaymeWebhook({
      method: 'CheckPerformTransaction',
      params: { amount: 450000000, account: { order_id: 'ord-123' } },
    });

    expect(response).toEqual({
      result: {
        allow: true,
        additional: { description: 'Uzum Marketplace Order Payment' },
      },
    });
  });

  it('should handle Click merchant Prepare action', async () => {
    const response = await paymentsService.handleClickWebhook({
      click_trans_id: 998877,
      service_id: 12345,
      merchant_trans_id: 'ord-123',
      amount: 4500000,
      action: 0,
      error: 0,
    });

    expect(response).toEqual({
      click_trans_id: 998877,
      merchant_trans_id: 'ord-123',
      merchant_prepare_id: 1,
      error: 0,
      error_note: 'Success',
    });
  });
});
