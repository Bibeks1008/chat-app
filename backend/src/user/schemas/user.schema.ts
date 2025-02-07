import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @Prop({ required: true, default: '' })
  profilePic: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
