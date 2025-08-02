// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // src/users/users.service.ts
  async create(createUserDto: CreateUserDto): Promise<User> {
    // önce 'any' veya 'unknown' kaynaktan gelen dto'yu kendi bildiğimiz shape'e cast et
    const safeDto = createUserDto as unknown as {
      email: string;
      password: string;
      role?: UserRole;
    };

    const { email, role = UserRole.USER, password } = safeDto;
    const user = this.userRepo.create({ email, role });
    user.password = await bcrypt.hash(password, 10);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
