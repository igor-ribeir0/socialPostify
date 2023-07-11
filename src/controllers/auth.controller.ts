import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthUserBody } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async login(@Body() body: AuthUserBody) {
    const { email, password } = body;

    return await this.authService.login(email, password);
  }
}