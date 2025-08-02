// src/weather/weather.service.ts

import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { WeatherQuery } from './weather-query.entity';
import { UsersService } from '../users/users.service';
import { WeatherResponse } from './weather-response.interface';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherQuery)
    private readonly weatherRepo: Repository<WeatherQuery>,

    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * Şehir bazlı hava sorgusu:
   * 1) Cache'te varsa oradan alır
   * 2) Yoksa OpenWeather API çağrısı yapar, cache'ler
   * 3) Her iki durumda da sorguyu DB'ye kaydeder
   */
  async fetchWeather(userId: number, city: string): Promise<WeatherResponse> {
    const key = `weather:${city.toLowerCase()}`;

    // artık `cached` kesin WeatherResponse veya undefined
    const cached = await this.cacheManager.get<WeatherResponse>(key);

    let data: WeatherResponse;
    if (cached) {
      data = cached;
    } else {
      const apiKey = this.configService.get<string>('weatherApi.key');
      const url = 'http://api.openweathermap.org/data/2.5/weather';
      const resp = await firstValueFrom(
        this.httpService.get<WeatherResponse>(url, {
          params: { q: city, appid: apiKey, units: 'metric' },
        }),
      );
      data = resp.data;
      await this.cacheManager.set(key, data, 300);
    }

    // DB kaydı kısmı aynen devam eder…
    // ...
    return data;
  }
}
