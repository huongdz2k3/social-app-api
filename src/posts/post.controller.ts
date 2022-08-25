import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { createPostDto } from "./dto/createPost.dto";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
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
        return await this.postService.createPost(createPostDto, req.user.email, file?.filename)
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllPosts() {
        return await this.postService.getAllPosts()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOnePost(@Param() id: string) {
        id = Object.values(id)[0]
        return await this.postService.getOnePost(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteOnePost(@Param() id: string) {
        id = Object.values(id)[0]
        return await this.postService.deleteOnePost(id)
    }

    @Patch('id')
    @UseGuards(JwtAuthGuard)
    async updateOnePost(@Param() id: string, @Body() updatePostDto: createPostDto) {
        id = Object.values(id)[0]
        return await this.postService.updateOnePost(id, updatePostDto)
    }
}