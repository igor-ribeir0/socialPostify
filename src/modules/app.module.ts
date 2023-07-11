import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}