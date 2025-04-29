// seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Purchase } from '../entity/purchase.entity';
import { BanList } from '../entity/bans.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class RowService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(BanList)
    private readonly banListRepository: Repository<BanList>,

    private dataSource: DataSource,
  ) {}

  async rowData() {
    await this.clearDatabase();
    const users = await this.createUsers();
    await this.createPurchases(users);
    await this.banUser(users[1]);

    return 'Test row data created';
  }

  async clearDatabase() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      await this.dataSource.query(`
        TRUNCATE TABLE 
          purchase, 
          ban_list, 
          "user" 
        RESTART IDENTITY 
        CASCADE;
      `);

      console.log('Все таблицы успешно очищены');
    } catch (error) {
      console.error('Ошибка при очистке базы данных:', error);
    }
  }

  private async createUsers(): Promise<User[]> {
    const usersData = [
      {
        firstname: 'Nick',
        lastname: 'Black',
        registration_date: new Date('2023-04-05'),
      },
      {
        firstname: 'Alice',
        lastname: 'White',
        registration_date: new Date('2023-05-06'),
      },
      {
        firstname: 'Tom',
        lastname: 'Yam',
        registration_date: new Date('2023-06-07'),
      },
      {
        firstname: 'Mot',
        lastname: 'May',
        registration_date: new Date('2023-07-08'),
      },
    ];

    return this.userRepository.save(usersData);
  }

  private async createPurchases(users: User[]): Promise<void> {
    const purchasesData = [
      { sku: 1001, price: 29.99, user: users[0], date: new Date('2023-04-10') },
      { sku: 1002, price: 15.49, user: users[0], date: new Date('2023-04-15') },
      { sku: 1003, price: 45.0, user: users[1], date: new Date('2023-05-08') },
      { sku: 1004, price: 22.99, user: users[1], date: new Date('2023-05-10') },
      { sku: 1005, price: 18.75, user: users[2], date: new Date('2023-06-09') },
      { sku: 1006, price: 33.5, user: users[2], date: new Date('2023-06-11') },
    ];

    await this.purchaseRepository.save(purchasesData);
  }

  private async banUser(user: User): Promise<void> {
    await this.banListRepository.save({
      user_id: user.id,
      date: new Date('2023-05-09'),
    });
  }
}
