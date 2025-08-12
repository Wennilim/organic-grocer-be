import { JwtService } from '@nestjs/jwt';
import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  login(@Body() { email, password }: { email: string; password: string }) {
    if (
      email !== this.configService.get('ADMIN_EMAIL') ||
      password !== this.configService.get('ADMIN_PASSWORD')
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email, role: 'admin' };
    return { access_token: this.jwtService.sign(payload) };
  }
}
