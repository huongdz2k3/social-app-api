import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "../user.service";
import { FriendsReq } from "./friendsreq.model";

@Injectable()
export class FriendsReqService {
    constructor(@InjectModel('FriendsReq') private readonly friendsReqModel: Model<FriendsReq>, private readonly userService: UserService) { }
    async sendReq(email: string, userRecipient: string) {
        return await this.friendsReqModel.create({ userreq: userRecipient, userreceipt: email })
    }

    async getReqs(email: string) {
        return await this.friendsReqModel.find({ userreceipt: email })
    }

    async updateReq(userReqId: string, status: string, email: string) {
        if (status === "accepted") {
            const [currentUser, requestUser] = await Promise.all([
                this.userService.findOne(email),
                this.userService.findById(userReqId),
            ])
            currentUser?.friends.push(requestUser?.id)
            requestUser?.friends.push(currentUser?.id)
            await currentUser.save()
            await requestUser.save()
        }
        return await this.friendsReqModel.findOneAndDelete({ userreq: userReqId, userreceipt: email })
    }

}