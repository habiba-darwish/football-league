import { IsInt, IsDateString } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  homeTeam: number;

  @IsInt()
  awayTeam: number;

  @IsInt()
  stadium: number;

  @IsDateString()
  date: string; // match entity property name

  @IsInt()
  scoreHome: number;

  @IsInt()
  scoreAway: number;
}
