import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Task2Module } from '../task2.module';
import { RowService } from './data.script';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Task2Module);
  const importService = app.get(RowService);

  await importService.rowData();
  await app.close().then(() => {
    console.log('row data created');
  });
}

bootstrap().catch((err) => {
  console.error('Error during data import', err);
  process.exit(1);
});
