import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { registerUserDto } from 'src/dto/registerUserDto.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-userDto.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    /**
   * Endpoint to handle user registration.
   * @param regDTO - The data for registering a new user.
   * @returns The user information after successful registration.
   */
    @Post('register')
    registration(@Body(ValidationPipe) regDTO: registerUserDto) {
      return this.authService.register(regDTO);
    }
    /**
   * Endpoint for user login.
   * @param logindto - The data for user login, including email and password.
   * @returns An authentication token upon successful login.
   */

    @Post('login')
    login(@Body(ValidationPipe)logindto:LoginUserDto){
return this.authService.login(logindto);
    }
}
