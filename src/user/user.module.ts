import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminAuthModule } from 'src/admin-auth/admin-auth.module';
import { UserController } from 'src/user/user.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [PrismaModule, AdminAuthModule],
  providers: [UserService, SupabaseService],
  controllers: [UserController],
})
export class UserModule {}
