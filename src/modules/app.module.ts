import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { PublicationsModule } from './publications.module';

@Module({
  imports: [UsersModule, AuthModule, PublicationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}