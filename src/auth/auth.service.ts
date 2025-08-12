import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: dto.role,
      },
    });

    return {
      access_token: this.jwtService.sign({
        sub: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: 'user',
      }),
    };
  }

  async login(dto: LoginDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (
      !existingUser ||
      !(await bcrypt.compare(dto.password, existingUser.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: existingUser.id,
      email: existingUser.email,
    });

    return {
      access_token: token,
    };
  }
}
