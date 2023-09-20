import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/backend/auth.service';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() credential: LoginDto) {
    return this.authService.signIn(credential);
  }
}
