import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsersForSidebar(userId: mongoose.Schema.Types.ObjectId) {
    try {
      const filteredUsers = await this.userModel
        .find({ _id: { $ne: userId } })
        .select('-password');

      return filteredUsers;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.log(err);
    }
  }
}
