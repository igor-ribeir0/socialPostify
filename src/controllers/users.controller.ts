import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password, avatar } = body;

    return await this.usersService.createUser(name, email, password, avatar);
  }
}