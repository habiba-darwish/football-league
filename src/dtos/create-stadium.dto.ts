import { IsString, IsInt } from 'class-validator';

export class CreateStadiumDto {
  @IsString()
  name: string;

  @IsInt()
  capacity: number;
}