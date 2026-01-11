import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Club } from './club.model';
import { Player } from './player.model';
import { Match } from './match.model';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  coachName: string;

  @ManyToOne(() => Club, (club) => club.teams)
  club: Club;

  @OneToMany(() => Player, (player) => player.team, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  players: Player[];

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];
}
