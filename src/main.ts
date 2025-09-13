import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const appConfig = app.get(ConfigService);
  app.setGlobalPrefix(appConfig.get('API_PREFIX', 'api/'));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.set('trust proxy', true);
  app.set('x-powered-by', false);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });
  const logger = new Logger('Api Service');
  const port = appConfig.get('PORT') || 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`API Service is running on port ${await app.getUrl()}`);
}
bootstrap();
