import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { sessions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class AuthPrismaRepository
  implements AuthRepository
{
  constructor(private prisma: PrismaService) {}

  async create(token: string, user_id: string, expiresAt: Date): Promise<void> {
    await this.prisma.sessions.create({
      data: {
        id: uuidv4(),
        token,
        user_id,
        expiresAt,
      },
    });
  }

  async getSession(token: string): Promise<sessions> {
    return await this.prisma.sessions.findFirst({
      where: {
        token: token,
      },
    });
  }
}