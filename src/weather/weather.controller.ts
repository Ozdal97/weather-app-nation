// src/weather/weather.controller.ts

import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Roles('user', 'admin')
  async getWeather(
    @Request() req: { user: { userId: number } },
    @Query('city') city: string,
  ) {
    return this.weatherService.fetchWeather(req.user.userId, city);
  }
}
