import { UseGuards } from '@nestjs/common';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from '../post.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    constructor(private readonly postService: PostService) { }
    @WebSocketServer()
    server: Server; // import server from socketio


    @SubscribeMessage('newFeed')
    async identity(@MessageBody() data: any): Promise<any> {
        const newFeed = await this.postService.getPostAfterCreate(data.email)
        this.server.emit('newPost', newFeed)
        return newFeed;
    }
}