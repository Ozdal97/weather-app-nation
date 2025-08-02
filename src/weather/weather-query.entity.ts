import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class WeatherQuery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column('simple-json')
  response: any;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
