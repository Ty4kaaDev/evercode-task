import { Module } from '@nestjs/common';
import { Task1Module } from './task1/task1.module';
import { Task2Service } from './task2/task2.service';
import { Task2Module } from './task2/task2.module';

@Module({
  imports: [Task1Module, Task2Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
