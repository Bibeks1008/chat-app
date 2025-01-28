import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  senderId: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiverId: User;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
