import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "../user.service";
import { FriendsReq } from "./friendsreq.model";

@Injectable()
export class FriendsReqService {
    constructor(@InjectModel('FriendsReq') private readonly friendsReqModel: Model<FriendsReq>, private readonly userService: UserService) { }
    async sendReq(userReq: string, userRecipient: string) {
        const user = await this.userService.findById(userReq)
        const check = user.friends.find((friend) => friend === userRecipient)
        if (check) {
            throw new BadRequestException('Request can not send')
        }
        return await this.friendsReqModel.create({ userreq: userReq, userreceipt: userRecipient })
    }

    async getReqs(userreq: string, userreceipt: string) {
        return await this.friendsReqModel.findOne({ userreq, userreceipt })
    }

    async updateReq(userReqId: string, status: string, email: string, currentUserId: string) {
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
        return await this.friendsReqModel.findOneAndDelete({ userreq: userReqId, userreceipt: currentUserId })
    }

    async updateReqs(userReqsId: any, status: any, email: string, userId: string) {
        if (status === "accepted") {
            const [users, currentUser] = await Promise.all([this.userService.getUsersByCond(userReqsId), this.userService.findOne(email)])
            currentUser.friends.push(...userReqsId)
            await currentUser.save()
            users.forEach(async (user) => {
                user.friends.push(currentUser.id)
                await user.save()
            })
        }
        return await this.friendsReqModel.deleteMany({ userreceipt: userId, userreq: { $in: userReqsId } })

    }

}