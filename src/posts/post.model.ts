import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type PostDocument = Post & Document;
@Schema()
export class Post {
    @Prop()
    title: string
    @Prop()
    content: string
    @Prop()
    userEmail: string
    @Prop()
    userId: string
    @Prop()
    img: [string]
    @Prop()
    commentsId: [string]
}
const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.virtual('User', {
    ref: 'User',
    foreignField: "_id",
    localField: "userId"
})

export { PostSchema }