import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user.module";
import { FriendsReqSchema } from "./friendsreq.model";
import { FriendsReqService } from "./friendsreq.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'FriendsReq', schema: FriendsReqSchema }]),
        forwardRef(() => UserModule)
    ],
    providers: [FriendsReqService],
    exports: [FriendsReqService]
})
export class FriendsReqModule { }