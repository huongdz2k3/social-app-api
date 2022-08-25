import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "src/users/user.service";
import { createPostDto } from "./dto/createPost.dto";
import { Post } from "./post.model";

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>, private readonly userService: UserService) { }
    async createPost(createPostDto: createPostDto, email: string, img?: string) {
        const [newPost, currentUser] = await Promise.all([
            this.postModel.create({
                title: createPostDto.title,
                content: createPostDto.content,
                userEmail: email,
                img: img
            }),
            this.userService.findOne(email)
        ])
        currentUser.posts.push(newPost.id)
        await currentUser.save()
        return newPost
    }

    async getAllPosts() {
        const posts = await this.postModel.find()
        return posts
    }

    async getOnePost(id: string) {
        return await this.postModel.findById(id)
    }

    async deleteOnePost(id: string) {
        return await this.postModel.findByIdAndDelete(id)
    }

    async updateOnePost(id: string, updatePostDto: createPostDto) {
        return await this.postModel.findByIdAndUpdate(id, updatePostDto)
    }
}