import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your frontend origin
    credentials: true, // Allow cookies and credentials
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
