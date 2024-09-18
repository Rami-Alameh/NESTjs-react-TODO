import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([userEntity])
,
JwtModule.register({secret:'todosecret',signOptions:{
  algorithm:'HS512',
  expiresIn:'2d'
}}),
PassportModule.register({defaultStrategy:'jwt'})
],
providers: [AuthService, JwtCustomStrategy],
controllers: [AuthController],
exports: [PassportModule, JwtCustomStrategy]
})
export class AuthModule {}
