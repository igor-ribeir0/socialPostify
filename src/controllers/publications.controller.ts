import { Body, Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserPublicationBody } from '../dtos/create-publication.dto';
import { PublicationsService } from '../services/publications.service';

interface RequestWithUserId extends Request {
  user_id: string;
}

@Controller()
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get('publications')
  async getUserPublications(@Req() request: RequestWithUserId) {
    return this.publicationsService.getUserPublications(request.user_id);
  }

  @Post('publication')
  async createPublication(
    @Req() request: RequestWithUserId,
    @Body() body: CreateUserPublicationBody,
  ) {
    const { image, title, text, dateToPublish, published, socialMedia } = body;

    return await this.publicationsService.createPublication(
      image,
      title,
      text,
      dateToPublish,
      published,
      socialMedia,
      request.user_id,
    );
  }
}