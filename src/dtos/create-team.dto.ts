import { IsString, IsInt } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsInt()
  clubId: number;

  @IsString()
  coachName: string;
}