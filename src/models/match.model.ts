import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.model';
import { Stadium } from './stadium.model';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  homeTeam: Team;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  awayTeam: Team;

  @Column({ nullable: true })
  scoreHome: number;

  @Column({ nullable: true })
  scoreAway: number;

  @ManyToOne(() => Stadium, (stadium) => stadium.matches)
  stadium: Stadium;
}
