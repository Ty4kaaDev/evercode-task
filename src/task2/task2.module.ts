import { Module } from '@nestjs/common';
import { Task2Controller } from './task2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Purchase } from './entity/purchase.entity';
import { Task2Service } from './task2.service';
import { RowService } from './rowData/data.script';
import { BanList } from './entity/bans.entity';

export const entities = [User, Purchase, BanList];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'taskdb',
      entities: entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [Task2Controller],
  providers: [Task2Service, RowService],
})
export class Task2Module {}
