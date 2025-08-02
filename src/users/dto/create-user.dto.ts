// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Kullanıcının email adresi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'En az 6 karakterli şifre',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Kullanıcı rolü',
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
