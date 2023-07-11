import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';

import { AuthController } from '../controllers/auth.controller';
import { AuthPrismaRepository } from '../repositories/prisma/auth.prisma.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthService } from '../services/auth.service';

import { UsersPrismaRepository } from '../repositories/prisma/users.prisma.repository';
import { UsersRepository } from '../repositories/users.repository';


@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        signOptions: { expiresIn: '7d' },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    },
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    AuthService,
  ],
})
export class AuthModule {}