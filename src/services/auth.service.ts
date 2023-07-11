import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const findUser = await this.usersRepository.get(email);

    if (!findUser) throw new UnauthorizedException('Invalid Email or Password!');

    if (!(await bcrypt.compare(password, findUser.password)))
      throw new UnauthorizedException('Invalid Email or Password!');

    const token = await this.jwtService.signAsync({ email: findUser.email });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.authRepository.create(token, findUser.id, expiresAt);

    return {
      token,
    };
  }
}