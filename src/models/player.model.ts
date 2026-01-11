import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.model';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  shirtNumber: number;

  @ManyToOne(() => Team, (team) => team.players, {
    onDelete: 'CASCADE',
  })
  team: Team;
}
