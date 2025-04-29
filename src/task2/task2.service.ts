import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Task2Service {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findUsersWithoutPurchases(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userRepo.query(
      `SELECT u.* FROM "${this.userRepo.metadata.tableName}" u
            LEFT JOIN purchase p ON u.id = p.user_id
            WHERE p.user_id IS NULL
            ORDER BY u.id ASC
            LIMIT $1 OFFSET $2;`,
      [limit, (page - 1) * limit],
    );

    const [{ total }] = await this.userRepo.query(
      `SELECT COUNT(*) as total FROM "${this.userRepo.metadata.tableName}" u
            LEFT JOIN purchase p ON u.id = p.user_id
            WHERE p.user_id IS NULL;`,
    );

    return { users, total: Math.ceil(total / limit) };
  }
}
