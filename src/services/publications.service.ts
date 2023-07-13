import { ConflictException, Injectable } from '@nestjs/common';
import { PublicationsRepository } from '../repositories/publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async getUserPublications(user_id: string) {
    return await this.publicationsRepository.getPublications(user_id);
  }

  async createPublication(
    image: string,
    title: string,
    text: string,
    dateToPublish: string,
    published: boolean,
    socialMedia: string,
    user_id: string,
  ) {
    const post = await this.publicationsRepository.getTitle(title);

    if (post) throw new ConflictException('Title already exist');

    await this.publicationsRepository.createUserPost(
      image,
      title,
      text,
      dateToPublish,
      published,
      socialMedia,
      user_id,
    );

    return 'Post created!';
  }
}