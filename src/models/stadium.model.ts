import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Club } from './club.model';
import { Match } from './match.model';

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @OneToOne(() => Club, (club) => club.stadium, {
    onDelete: 'SET NULL',
  })
  club: Club;

  @OneToMany(() => Match, (match) => match.stadium, {
    onDelete: 'SET NULL',
  })
  matches: Match[];
}
