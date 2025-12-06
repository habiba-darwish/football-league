import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SampleEnum {
  ONE = 'Admin',
  TWO = 'Player',
  THREE = 'Coach',
  FOUR = 'Fan',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: SampleEnum,
    default: SampleEnum.ONE, // 'Admin'
  })
  role: SampleEnum;
}
