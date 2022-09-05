import { Body, Controller, Delete, Get, Param, Patch, Post, Request, Sse, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { createPostDto } from "./dto/createPost.dto";
import { PostService } from "./post.service";
import { Server } from 'socket.io';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    @WebSocketServer()
    server: Server;

    // onModuleInit() {
    //     this.server.on('connection', (socket) => {
    //         console.log(socket.id)
    //     })
    // }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './src/posts/imgs',
            filename: (req, file, callback) => {
                const ext = extname(file.originalname)
                const filename = `${Object.values(req.user)}${Date.now() + '-' + Math.round(Math.random() * 1E9)}${ext}`
                callback(null, filename)
            }
        })
    }))
    async createPost(@Body() createPostDto: createPostDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
        const newPost = await this.postService.createPost(createPostDto, req.user.email, req.user.id, file?.filename)
        return newPost
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllPosts(@Request() req) {
        return await this.postService.getAllPosts(req?.user?.email)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOnePost(@Param() id: string, @Request() req) {
        id = Object.values(id)[0]
        return await this.postService.getPost(id, req.user.id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteOnePost(@Param() id: string) {
        id = Object.values(id)[0]
        return await this.postService.deleteOnePost(id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateOnePost(@Param() id: string, @Body() updatePostDto: createPostDto) {
        id = Object.values(id)[0]
        return await this.postService.updateOnePost(id, updatePostDto)
    }

    @Patch(':id/like')
    @UseGuards(JwtAuthGuard)
    async likedPost(@Param() id: string, @Request() req) {
        id = Object.values(id)[0]
        return this.postService.likePost(id, req?.user.id)
    }

    @Post(':id/share')
    @UseGuards(JwtAuthGuard)
    async sharePost(@Param() id: string, @Body() content: string, @Request() req) {
        content = Object.values(content)[0]
        id = Object.values(id)[0]
        return await this.postService.sharePost(id, req.user.id, content)
    }


}