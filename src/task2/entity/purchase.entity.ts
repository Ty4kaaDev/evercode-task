import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Purchase {
  @PrimaryColumn()
  sku: number;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  date: Date;
}
