import { OauthUser } from '@entities/o-auth-user.entity';
import { User } from '@entities/user.entity';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';
import { UserService } from '@modules/user/services/backend/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OauthUserRepository } from '@repositories/o-auth.repository';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(OauthUserRepository)
    private readonly oAuthUserRepository: OauthUserRepository,
  ) {}

  comparePassword = async (password: string, userPassword: string) =>
    await compare(password, userPassword);

  async signIn(credential: LoginDto) {
    const { email, password } = credential;
    const user = await this.userService.findOne(email);

    if (!this.comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }

    const oAuth: OauthUser = await this.createOauthUser(user);

    return await this.getTokens(oAuth, user.email);
  }

  async createOauthUser(user: User): Promise<OauthUser> {
    try {
      const created: OauthUser = await this.oAuthUserRepository.create({
        userId: user.id,
      });

      return await this.oAuthUserRepository.save(created);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getTokens(oAuth: OauthUser, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: oAuth.accessToken,
          email,
        },
        {
          secret: this.configService.get<string>('jwt.access.secret'),
          expiresIn: this.configService.get<string>('jwt.access.expire'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: oAuth.refreshToken,
        },
        {
          secret: this.configService.get<string>('jwt.refresh.secret'),
          expiresIn: this.configService.get<string>('jwt.refresh.expire'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
