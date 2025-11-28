import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Enlève les champs non définis
      forbidNonWhitelisted: true, // Erreur si champs inconnus
      transform: true, // Transforme les types automatiquement
    }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
