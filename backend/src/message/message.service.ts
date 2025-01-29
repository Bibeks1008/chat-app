import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schema';
import mongoose, { Model } from 'mongoose';
import { MessageDto } from './dto';
import { Conversation } from 'src/conversation/schema';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    private websocketGateway: WebsocketGateway,
  ) {}

  async sendMessage(
    senderId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    dto: MessageDto,
  ) {
    try {
      let conversation = await this.conversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await this.conversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new this.messageModel({
        senderId,
        receiverId,
        message: dto.message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);

      const receiverSocketId = this.websocketGateway.getReceiverSocketId(
        receiverId.toString(),
      );

      if (receiverSocketId) {
        this.websocketGateway.server
          .to(receiverSocketId)
          .emit('newMessage', newMessage);
      }

      return newMessage;
    } catch (err) {
      console.error('Error in sendMessage:', err.message);
      throw new Error('Internal server error');
    }
  }

  async getMessages(
    senderId: mongoose.Schema.Types.ObjectId,
    chatReceiverId: mongoose.Types.ObjectId,
  ) {
    console.log(senderId);
    console.log(chatReceiverId);
    try {
      const conversation = await this.conversationModel
        .findOne({
          participants: { $all: [senderId, chatReceiverId] },
        })
        .populate({ path: 'messages', model: 'Message' });

      if (!conversation) return [];

      const messages = conversation.messages;
      return messages;
    } catch (err) {
      console.error('Error in getMessage:', err.message);
      throw new Error('Internal server error');
    }
  }
}
