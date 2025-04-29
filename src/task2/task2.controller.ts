import { Controller, Get, Query } from '@nestjs/common';
import { Task2Service } from './task2.service';

@Controller('task2')
export class Task2Controller {
  constructor(private readonly taskService: Task2Service) {}

  @Get('/without-purchases')
  async getUsersWithoutPurchases(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.taskService.findUsersWithoutPurchases(page, limit);
  }
}
