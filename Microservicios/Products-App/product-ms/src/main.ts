import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';


async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(envs.port);
  logger.log(`Products service is running on port ${envs.port}`);
}
bootstrap();
