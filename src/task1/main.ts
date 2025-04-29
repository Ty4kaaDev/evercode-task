import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Task1Module } from './task1.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Task1Module);
  await app.listen(3001).then(() => {
    console.log('started task 1');
  });
}

bootstrap();
