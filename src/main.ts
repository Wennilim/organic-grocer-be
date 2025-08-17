import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AdminGuard } from 'src/common/guards/admin.guard';
// import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 如果要globally把所有API只是指定给admin就那么写
  // const jwtService = app.get(JwtService);
  // app.useGlobalGuards(new AdminGuard(jwtService));

  app.enableCors({
    origin: [
      'http://localhost:5173', // 本地开发 React
      'https://nova-panel.netlify.app', // 线上部署的前端
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
