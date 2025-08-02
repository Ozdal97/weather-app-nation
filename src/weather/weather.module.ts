// src/weather/weather.module.ts

import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { HttpModule } from '@nestjs/axios';

import { WeatherQuery } from './weather-query.entity';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

import { UsersModule } from '../users/users.module'; // ← ekledik

@Module({
  imports: [
    UsersModule, // ← UsersService burada
    TypeOrmModule.forFeature([WeatherQuery]),
    HttpModule,
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        store: redisStore,
        host: cs.get<string>('redis.host', 'redis'),
        port: cs.get<number>('redis.port', 6379),
        ttl: 300,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
