import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import mongoose from 'mongoose';
import { MessageDto } from './dto';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/send/:receiverId')
  sendMessage(
    @GetUser('_id') senderId: mongoose.Schema.Types.ObjectId,
    @Param('receiverId') receiverId: string,
    @Body() dto: MessageDto,
  ) {
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
    console.log('in sendmessage copn == >/', receiverObjectId);
    return this.messageService.sendMessage(senderId, receiverObjectId, dto);
  }

  @Get(':chatReceiverId')
  getMessages(
    @GetUser('_id') senderId: mongoose.Schema.Types.ObjectId,
    @Param('chatReceiverId') chatReceiverId: string,
  ) {
    const chatReceiverObjectId = new mongoose.Types.ObjectId(chatReceiverId);
    console.log('in controller  ', chatReceiverObjectId, senderId);
    return this.messageService.getMessages(senderId, chatReceiverObjectId);
  }
}
