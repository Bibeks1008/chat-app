import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'https://chat-appbybibs02.netlify.app'],
    methods: ['GET', 'POST'],
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private userSocketMap: { [userId: string]: string } = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.query.userId;

    if (typeof userId === 'string' && userId.trim() !== '') {
      this.userSocketMap[userId] = client.id; // Safe to use as a key now
    } else {
      console.warn(`Invalid or missing userId for client: ${client.id}`);
    }

    this.server.emit('getOnlineUsers', Object.keys(this.userSocketMap));
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const userId = client.handshake.query.userId;

    if (typeof userId === 'string' && userId.trim() !== '') {
      delete this.userSocketMap[userId];
    }

    this.server.emit('getOnlineUsers', Object.keys(this.userSocketMap));
  }

  getReceiverSocketId(receiverId: string): string {
    return this.userSocketMap[receiverId];
  }
}
