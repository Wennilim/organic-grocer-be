import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  email?: string;
  name?: string;
  role?: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      return decoded.role === 'admin';
    } catch (error) {
      console.error('JWT verification failed:', error);
      return false;
    }
  }
}
