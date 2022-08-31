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

    @Post('friends/request')
    @UseGuards(JwtAuthGuard)
    async addFriendReq(@Body() userId: string, @Request() req) {
        userId = Object.values(userId)[0]
        return await this.friendsReqService.sendReq(req?.user?.id, userId)
    }

    @Patch('friends/request')
    @UseGuards(JwtAuthGuard)
    async updateFriendReq(@Body() body: string, @Request() req) {
        const [status, userReqId] = Object.values(body)
        return await this.friendsReqService.updateReq(userReqId, status, req?.user?.email, req?.user?.id)
    }

    @Patch('friends/requests')
    @UseGuards(JwtAuthGuard)
    async updateFriendReqs(@Body() body: any, @Request() req) {
        const [ids, status] = Object.values(body)
        return await this.friendsReqService.updateReqs(ids, status, req?.user?.email, req?.user?.id)
    }
}

// like , share (type post) , socket (not reload)