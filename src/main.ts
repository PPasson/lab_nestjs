import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe())
  app.use(logger);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Project Example')
    .setDescription('The project API description')
    .setVersion('1.0')
    .addTag('app, users, cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  

  await app.listen(3000);
}
bootstrap();
