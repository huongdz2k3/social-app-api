import { Body, Controller, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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
                console.log(req.user)
                const filename = `${Object.values(req.user)}${Date.now() + '-' + Math.round(Math.random() * 1E9)}${ext}`
                callback(null, filename)
            }
        })
    }))
    async createPost(@Body() createPostDto: createPostDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
        return await this.postService.createPost(createPostDto, req.user.email, file?.filename)
    }
}