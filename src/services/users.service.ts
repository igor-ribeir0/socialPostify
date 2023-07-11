import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ) {
    const findUser = await this.userRepository.get(email);
    if (findUser)
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