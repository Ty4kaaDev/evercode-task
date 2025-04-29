import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { RandomNumber, Task1Service } from './task1.service';

@Controller('task1')
export class Task1Controller {
  constructor(private readonly teskService: Task1Service) {}

  @Post()
  async createNumber() {
    const res = this.teskService.generate();
    return res;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const res = this.teskService.getById(id);
    if (!res) {
      throw new HttpException('Not found', 404);
    }
    return res;
  }
}
