import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Task2Module } from './task2.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Task2Module);
  await app.listen(3002).then(() => {
    console.log('started task 2');
  });
}

bootstrap();
