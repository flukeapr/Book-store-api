import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private publishableKey: string;

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY', '');
    this.publishableKey = this.configService.get<string>(
      'STRIPE_PUBLISHABLE_KEY',
      '',
    );

    this.stripe = new Stripe(secretKey, { apiVersion: '2025-08-27.basil' });
  }

  async createPayment(data: { cost: number }) {
    const customer = await this.stripe.customers.create();
    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2025-08-27.basil' },
    );
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: data.cost,
      currency: 'thb',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: this.publishableKey,
    };
  }
}
