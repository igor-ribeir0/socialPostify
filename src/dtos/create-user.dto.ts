import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  avatar: string;
}