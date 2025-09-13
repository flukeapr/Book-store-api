import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('payment')
  async createPayment(@Body() body: { cost: number }) {
    return this.stripeService.createPayment(body);
  }
}
