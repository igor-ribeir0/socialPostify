import { sessions } from '@prisma/client';

export abstract class AuthRepository {
  abstract create(
    token: string,
    user_id: string,
    expiresAt: Date,
  ): Promise<void>;

  abstract getSession(token: string): Promise<sessions>;
}