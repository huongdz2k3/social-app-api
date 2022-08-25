import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/users/user.module";
import { PostController } from "./post.controller";
import { PostSchema } from "./post.model";
import { PostService } from "./post.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
        UserModule,
        AuthModule
    ],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService]
})

export class PostModule { }