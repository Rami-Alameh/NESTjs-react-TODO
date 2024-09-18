import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/Entity/user.entity';
import { registerUserDto } from 'src/dto/registerUserDto.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from 'src/dto/login-userDto.dto';
import { JwtService } from "@nestjs/jwt";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity) private reposit: Repository<userEntity>,
    private jwt: JwtService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(registerUserDto: registerUserDto) {
    const { email, password } = registerUserDto;
    const hashed = await bcrypt.hash(password, 12);//hashes password using bcrypt 
    const salt = await bcrypt.getSalt(hashed);//uses salt library for hashing
//registers user following user entity modulity
    const user = new userEntity();
    user.email = email;
    user.password = hashed;
    user.salt = salt;
//creates user
    this.reposit.create(user);

    try {
      //tries to save or catches error
      return await this.reposit.save(user);
    } catch (err) {
      throw new InternalServerErrorException('Server error on saving user');
    }
  }

  @ApiOperation({ summary: 'Login with user credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(logindto: LoginUserDto) {
    const { email, password } = logindto;
    const user = await this.reposit.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const salt = user.salt;
    const doespassmatch = await bcrypt.compare(password, user.password);//compares password to hashed password

    if (doespassmatch) {
      //creates payload with token for verification
      const jwtpayload = { email };
      //expires token in 1 day and uses hs512 algorithim
      const jwtToken = await this.jwt.signAsync(jwtpayload, { expiresIn: '1d', algorithm: 'HS512' });
      return { jwtToken };
    } else {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }
}