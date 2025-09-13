import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { StripeModule } from './stripe/stripe.module';

export const JWT_ACCESS_TOKEN = 'JWT_ACCESS_TOKEN';
export const JWT_REFRESH_TOKEN = 'JWT_REFRESH_TOKEN';

export const swaggerSetup = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Book Store Payment Service')
    .setDescription('API documentation for the Book Store Payment h Service')
    .setVersion('1.0')
    .addTag('service')
    .addBearerAuth({ in: 'header', name: JWT_ACCESS_TOKEN, type: 'http' })
    .addBearerAuth(
      { in: 'header', name: JWT_REFRESH_TOKEN, type: 'http' },
      JWT_REFRESH_TOKEN,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [AppModule, StripeModule],
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
