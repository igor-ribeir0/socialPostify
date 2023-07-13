import { publications } from '@prisma/client';

export abstract class PublicationsRepository {
  abstract getPublications(user_id: string): Promise<publications[]>;

  abstract getTitle(title: string): Promise<publications>;

  abstract createUserPost(
    image: string,
    title: string,
    text: string,
    dateToPublish: string,
    published: boolean,
    socialMedia: string,
    user_id: string,
  ): Promise<void>;
}