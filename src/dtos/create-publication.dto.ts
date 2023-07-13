import { IsBoolean, IsDateString, IsNotEmpty, IsString, IsUrl } from 'class-validator';
  
  export class CreateUserPublicationBody {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    image: string;
  
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    text: string;
  
    @IsNotEmpty()
    @IsString()
    @IsDateString()
    dateToPublish: string;
  
    @IsNotEmpty()
    @IsBoolean()
    published = false;
  
    @IsNotEmpty()
    @IsString()
    socialMedia: string;
}