import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class BanList {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: 'date' })
  date: Date;
}
