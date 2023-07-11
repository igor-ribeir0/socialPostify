import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UsersController } from '../controllers/users.controller';
import { UsersPrismaRepository } from '../repositories/prisma/users.prisma.repository';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from '../services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    UsersService,
  ],
})
export class UsersModule {}