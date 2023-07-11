import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async registerUser(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ) {
    const user = await this.userRepository.get(email);
    if (user)
      throw new HttpException('User already exist', HttpStatus.CONFLICT);

    await this.userRepository.create(
      name,
      email,
      await bcrypt.hash(password, 10),
      avatar,
    );

    return 'User created!';
  }
}