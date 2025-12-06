import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Stadium } from './stadium.model';
import { Team } from './team.model';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Stadium, (stadium) => stadium.club, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  stadium: Stadium;

  @OneToMany(() => Team, (team) => team.club, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  teams: Team[];
}
