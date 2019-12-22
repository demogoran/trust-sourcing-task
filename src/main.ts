import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenGuard } from './token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalGuards(new TokenGuard());
  await app.listen(3000);
}
bootstrap();
