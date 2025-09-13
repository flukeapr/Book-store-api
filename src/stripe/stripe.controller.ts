import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('payment')
  async createPayment(@Body() body: PaymentDto) {
    return this.stripeService.createPayment(body);
  }
}
