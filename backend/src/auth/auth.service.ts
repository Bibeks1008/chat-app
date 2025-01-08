import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthLoginDto, AuthSignupDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthSignupDto) {
    const { fullName, username, password, confirmPassword, gender } = dto;

    if (password !== confirmPassword) {
      throw new HttpException("Password doesn't match", HttpStatus.BAD_REQUEST);
    }

    try {
      const hashedPwd = await bcrypt.hash(password, 12);
      const user = await this.userModel.findOne({
        username: username.trim().toLocaleLowerCase(),
      });

      if (user) {
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new this.userModel({
        fullName,
        username: username.trim().toLocaleLowerCase(),
        password: hashedPwd,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      });

      if (newUser) {
        await newUser.save();
        return { message: 'User created successfully!' };
      } else {
        throw new HttpException('Invalid user data', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);
    }
  }

  async login(dto: AuthLoginDto) {
    const { username, password } = dto;

    try {
      const user = await this.userModel.findOne({
        username: username.trim().toLocaleLowerCase(),
      });

      const isPasswordCorrect = await bcrypt.compare(password, user?.password);

      if (!user || !isPasswordCorrect) {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.jwt.signAsync(
        { userId: user._id },
        {
          expiresIn: '15d',
          secret: this.config.get('JWT_SECRET'),
        },
      );

      return {
        message: 'Login Successfull!',
        data: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        },
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);
    }
  }
}
