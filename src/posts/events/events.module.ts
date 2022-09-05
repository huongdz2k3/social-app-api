
import { Module } from '@nestjs/common';
import { PostModule } from '../post.module';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [PostModule],
    providers: [EventsGateway],
})
export class EventsModule { }