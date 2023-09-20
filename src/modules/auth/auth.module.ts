import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService as BackendAuthService } from './services/backend/auth.service';
import { AuthController as BackendAuthController } from './controllers/backend/auth.controller';
import { OauthUserRepository } from '@repositories/o-auth.repository';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [BackendAuthService, OauthUserRepository],
  controllers: [BackendAuthController],
  exports: [BackendAuthService],
})
export class AuthModule {}
