import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { PostModule } from "src/posts/post.module";
import { CommnetController } from "./cmt.controller";
import { CommnetSchema } from "./cmt.model";
import { CommnetService } from "./cmt.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Comment', schema: CommnetSchema }]),
        PostModule,
        AuthModule
    ],
    controllers: [CommnetController],
    providers: [CommnetService],
    exports: [CommnetService]

})
export class CommnetModule { }