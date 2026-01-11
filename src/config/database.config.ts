import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';



export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [__dirname + '/../models/*.model{.ts,.js}'],
  synchronize: true,
};
