import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendsReqModule } from "./friendsreq/friendsreq.module";
import { FriendsReqService } from "./friendsreq/friendsreq.service";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        forwardRef(() => FriendsReqModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
}
)
export class UserModule { }