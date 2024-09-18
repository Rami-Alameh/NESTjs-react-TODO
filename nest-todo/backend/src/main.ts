import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //sets globaleprefix to api like localhose/api
  app.setGlobalPrefix('api');
  //to transfer data to frontend
  app.enableCors();
  const options = new DocumentBuilder()
  .setTitle('Your API Title')
  .setDescription('Your API Description')
  .setVersion('1.0')
  .addTag('todo-app') 
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
