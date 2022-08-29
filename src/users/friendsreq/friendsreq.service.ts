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

    async updateReq(reqId: string, status: string, email: string) {
        const [currentUser, friend] = await Promise.all([this.userService.findOne(email), this.friendsReqModel.findByIdAndDelete(reqId)])
        if (status === 'accepted') {
            currentUser.friends.push(friend.userreq)
            currentUser.save()
        }
        return currentUser
    }
}