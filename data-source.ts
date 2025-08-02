// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // Hem JS hem de TS entity dosyalarını dahil et:
  entities: [
    __dirname + '/dist/**/*.entity.js', // prod’da derlenmiş hali
    __dirname + '/src/**/*.entity.ts', // ts-node ile seed çalışırken
  ],
  migrations: [
    __dirname + '/dist/migrations/*.js',
    __dirname + '/migrations/*.ts',
  ],
  // synchronize: false, // prod’da false
});
