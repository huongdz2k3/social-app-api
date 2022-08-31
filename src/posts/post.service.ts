import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserService } from "src/users/user.service";
import { createPostDto } from "./dto/createPost.dto";
import { Post } from "./post.model";

@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>, private readonly userService: UserService) { }
    async createPost(createPostDto: createPostDto, email: string, userId: string, img?: string) {
        const [newPost, currentUser] = await Promise.all([
            this.postModel.create({
                title: createPostDto.title,
                content: createPostDto.content,
                userEmail: email,
                img: img,
                userId: userId
            }),
            this.userService.findOne(email)
        ])
        currentUser.posts.push(newPost.id)
        await currentUser.save()
        return newPost
    }

    async getAllPosts(email: string) {
        let newFeed = []
        const currentUser = await this.userService.findOne(email)
        newFeed.push(this.getPostsByUserId(currentUser.id))
        const listFriends = currentUser.friends
        listFriends.forEach((friendId) => {
            const posts = this.getPostsByUserId(friendId)
            newFeed.push(posts)
        })
        newFeed = await Promise.all(newFeed)
        return newFeed
    }

    async isFriend(currentUserId: string, userPostId: string) {
        const user = await this.userService.findById(userPostId)
        const check = user.friends.find((friend) => friend === currentUserId)
        return check
    }

    async getPostsByUserId(userId: string) {
        return await this.postModel.find({ userId })
    }

    async getPost(id: string, userId: string) {
        const post = await this.postModel.findOne({ id })
        const check = await this.isFriend(userId, post?.userId)
        if (!check) {
            throw new BadRequestException('You can not see this post')
        }
        return post
    }

    async getOnePost(id: string) {
        return await this.postModel.findOne({ id })
    }

    async deleteOnePost(id: string) {
        return await this.postModel.findByIdAndDelete(id)
    }

    async updateOnePost(id: string, updatePostDto: createPostDto) {
        return await this.postModel.findByIdAndUpdate(id, updatePostDto)
    }

    async likePost(id: string, userId: string) {
        const post = await this.getOnePost(id)
        const check = post.liked.find((id) => userId === id)
        if (check) {
            throw new BadRequestException('You liked this post')
        }
        post.liked.push(userId)
        post.save()
        return post
    }

}