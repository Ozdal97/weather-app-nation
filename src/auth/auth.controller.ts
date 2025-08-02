// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    // DTO validasyonu zaten pipe ile yapılmış olacak; yine de ekstra kontrol ekleyebiliriz
    if (!dto.password) {
      throw new BadRequestException('Password is required');
    }

    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }
    return this.authService.login(user);
  }
}
