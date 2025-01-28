import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }], 
    required: true,
  })
  participants: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Message' }], 
    default: [], 
  })
  messages: Types.ObjectId[];
}


export const ConversationSchema = SchemaFactory.createForClass(Conversation);