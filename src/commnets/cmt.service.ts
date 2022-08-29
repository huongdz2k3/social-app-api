import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostService } from "src/posts/post.service";
import { Commnet } from "./cmt.model";

@Injectable()
export class CommnetService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Commnet>, private readonly postService: PostService) { }
    async createCommnet(content: string, postId: string, email: string, img?: string) {
        const [commnet, currentPost] = await Promise.all(
            [this.commentModel.create({
                content,
                postId,
                email,
                img
            }),
            this.postService.getOnePost(postId)
            ])
        currentPost.commentsId.push(commnet.id)
        await currentPost.save()
        return commnet
    }

    async getAllCommnets(postId: string) {
        const currentComments = await (await this.postService.getOnePost(postId)).commentsId
        return await this.commentModel.find({ id: { $in: currentComments } })
    }

    async getOneComment(cmtId: string) {
        return await this.commentModel.findById(cmtId)
    }

    async updateCommnet(cmtId: string, content: string) {
        return await this.commentModel.findByIdAndUpdate(cmtId, { content })
    }

    async deleteComment(cmtId: string) {
        return await this.commentModel.findByIdAndDelete(cmtId)
    }
}

//add fr user req acp / deci
// search user 