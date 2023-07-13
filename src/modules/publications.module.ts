import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthPrismaRepository } from '../repositories/prisma/auth.prisma.repository';
import { AuthRepository } from '../repositories/auth.repository';

import { PublicationsController } from '../controllers/publications.controller';
import { PublicationsPrismaRepository } from '../repositories/prisma/publications.prisma.repository';
import { PublicationsRepository } from '../repositories/publications.repository';
import { PublicationsService } from '../services/publications.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        signOptions: { expiresIn: '2d' },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [PublicationsController],
  providers: [
    PrismaService,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    },
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PublicationsPrismaRepository,
    },
  ],
})
export class PublicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('publication', 'publications');
  }
}