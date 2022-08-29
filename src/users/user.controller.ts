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
        return await this.friendsReqService.sendReq(req?.user?.email, userId)
    }

    @Patch('friends/requests/:status/:reqId')
    @UseGuards(JwtAuthGuard)
    async updateFriendReq(@Param() param: string, @Request() req) {
        const [status, reqId] = Object.values(param)
        return await this.friendsReqService.updateReq(reqId, status, req?.user?.email)
    }

}