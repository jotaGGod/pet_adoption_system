import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true, // Remove propriedades não permitidas
    forbidNonWhitelisted: true, // Gera erro se propriedades não permitidas forem enviadas
  }));

  const config = new DocumentBuilder()
    .setTitle('Animals Adoption System API')
    .setDescription('The animals adoption system API description')
    .setVersion('1.0')
    .addTag('animals')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
