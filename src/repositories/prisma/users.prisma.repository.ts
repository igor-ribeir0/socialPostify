import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { users } from '@prisma/client';
import { UsersRepository } from '../users.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async get(email: string): Promise<users> {
    return await this.prisma.users.findFirst({ where: { email } });
  }

  async create(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<void> {
    await this.prisma.users.create({
      data: {
        id: uuidv4(),
        name,
        email,
        password,
        avatar,
      },
    });
  }
}