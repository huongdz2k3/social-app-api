import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CommnetService } from "./cmt.service";

@Controller(':postId/comment')
export class CommnetController {
    constructor(private readonly commnetService: CommnetService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCommnet(@Body() content: string, @Param() ids: any, @Request() req) {
        ids = Object.values(ids)

        return await this.commnetService.createCommnet(Object.values(content)[0], ids[0], req.user.email)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCommnet(@Param() ids: any) {
        ids = Object.values(ids)
        return await this.commnetService.getAllCommnets(ids)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOneComment(@Param() ids: any) {
        ids = Object.values(ids)
        return await this.commnetService.getOneComment(ids[1])
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCommnet(@Param() ids: any, @Body() content: string) {
        ids = Object.values(ids)
        return await this.commnetService.updateCommnet(ids[1], Object.values(content)[0])
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteComment(@Param() ids: any) {
        ids = Object.values(ids)
        return await this.commnetService.deleteComment(ids[1])
    }
}