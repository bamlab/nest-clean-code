// Must be first
import 'source-map-support/register';

// Imports from "nest"
import { NestFactory } from '@nestjs/core';
import { middleware as expressCtx } from 'express-ctx';

// Imports from "api-gateway"
import { AppModule } from '@app/api-gateway/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  const logger = app.get(Logger);
  logger.setContext('main');
  app.useLogger(logger);

  const options = new DocumentBuilder().setTitle('API Gateway').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(expressCtx);
  // Starts listening for shutdown hooks
  if (process.env.NODE_ENV !== 'test') {
    app.enableShutdownHooks();
  }

  await app.listen(3000);
  logger.log('API-Gateway is listening on port 3000');
}
bootstrap();
