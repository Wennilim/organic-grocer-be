/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private prisma: PrismaService) {
    const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
      if (!req || !req.cookies) return null;
      const cookies = req.cookies as Record<string, string | undefined>;
      const token = cookies.refreshToken ?? null;
      return typeof token === 'string' ? token : null;
    };

    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_REFRESH_SECRET ?? '',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = (req.cookies as Record<string, string | undefined>)
      ?.refreshToken;
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Refresh token not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('User not found or no refresh token');
    }

    const matches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!matches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      refreshToken,
    };
  }
}
