import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('initiate')
  initiatePayment(@Body() body: { orderId: string; method: string }) {
    return this.paymentsService.initializePayment(body.orderId, body.method);
  }

  @Post('webhook/payme')
  handlePayme(@Body() body: any) {
    return this.paymentsService.handlePaymeWebhook(body);
  }

  @Post('webhook/click')
  handleClick(@Body() body: any) {
    return this.paymentsService.handleClickWebhook(body);
  }

  @Post('sandbox/confirm/:orderId')
  sandboxConfirm(@Param('orderId') orderId: string) {
    return this.paymentsService.sandboxConfirmPayment(orderId);
  }
}
