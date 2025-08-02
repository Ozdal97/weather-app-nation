// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    if (!pass) {
      // ya da direkt `return null` da diyebilirsiniz
      throw new BadRequestException('Password must be provided');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const matches = await bcrypt.compare(pass, user.password);
    if (!matches) {
      return null;
    }

    const { password, ...safe } = user;
    return safe;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
