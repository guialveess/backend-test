import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';

const theme = new SwaggerTheme();
const darkTheme = theme.getBuffer('dark' as SwaggerThemeName);

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend Test API')
    .setDescription('API RESTful com NestJS e DynamoDB')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document, {
  customCss: darkTheme.toString(),
});

  await app.listen(3000);
  console.log('🚀 Swagger em http://localhost:3000/api');
}
bootstrap();
