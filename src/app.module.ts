import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommnetModule } from './commnets/cmt.module';
import { PostModule } from './posts/post.module';
import { FriendsReqModule } from './users/friendsreq/friendsreq.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://huongdz2003:Huongdzcogisai2003@nodeexpressprojects.ybqix.mongodb.net/Social-App'),
    AuthModule,
    UserModule,
    PostModule,
    CommnetModule,
    FriendsReqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
