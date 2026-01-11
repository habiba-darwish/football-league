import { IsString, IsInt } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  position: string;

  @IsInt()
  shirtNumber: number;

  @IsInt()
  teamId: number;
}