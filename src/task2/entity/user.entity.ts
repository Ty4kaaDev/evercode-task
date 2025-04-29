import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'date' })
  registration_date: Date;
}
