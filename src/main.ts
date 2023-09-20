import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get<ConfigService>(ConfigService);

  const isDevelopmentMode =
    configService.get<'test' | 'develop' | 'production'>('mode') !==
    'production';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('/api/v1');

  if (isDevelopmentMode) {
    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle('DEV').setVersion('1.0').build(),
      ),
      { useGlobalPrefix: true },
    );
  }

  await app.listen(configService.get<number>('port'));
}
bootstrap();
