import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from 'src/admin-auth/admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  adminLogin(@Body() body: { email: string; password: string }) {
    return this.adminAuthService.login(body);
  }
}
