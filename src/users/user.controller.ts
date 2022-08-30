import { Body, Controller, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FriendsReqService } from "./friendsreq/friendsreq.service";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly friendsReqService: FriendsReqService) { }
    @Post('search')
    @UseGuards(JwtAuthGuard)
    async search(@Body() searchString: any) {
        return await this.userService.findUserByCond(searchString.searchString)
    }

    @Post('friends/requests/:id')
    @UseGuards(JwtAuthGuard)
    async addFriendReq(@Param() userId: string, @Request() req) {
        userId = Object.values(userId)[0]
        return await this.friendsReqService.sendReq(req?.user?.id, userId)
    }

    @Patch('friends/request/:id')
    @UseGuards(JwtAuthGuard)
    async updateFriendReq(@Param() userReqId: string, @Body() status: string, @Request() req) {
        status = Object.values(status)[0]
        userReqId = Object.values(userReqId)[0]
        return await this.friendsReqService.updateReq(userReqId, status, req?.user?.email)
    }

    @Patch('friends/requests/:status')
    @UseGuards(JwtAuthGuard)
    async updateFriendReqs(@Param() status: string, @Body() userIdReqs: any, @Request() req) {
        status = Object.values(status)[0]
        userIdReqs = Object.values(userIdReqs)
        return await this.friendsReqService.updateReqs(userIdReqs, status, req?.user?.email, req?.user?.id)
    }
}