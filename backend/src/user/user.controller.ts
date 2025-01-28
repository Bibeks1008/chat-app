import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  getUsersForSidebar(@GetUser('_id') userId: mongoose.Schema.Types.ObjectId) {
    return this.userService.getUsersForSidebar(userId);
  }
}
