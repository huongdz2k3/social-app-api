import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop()
    username: string
    @Prop({ unique: true })
    email: string
    @Prop()
    password: string
    @Prop()
    phone: string
    @Prop()
    address: string
    @Prop()
    gender: string
    @Prop()
    avatar: string
    @Prop()
    posts: [string]
    @Prop()
    friends: [string]
    @Prop()
    searching: string
}
const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('Posts', {
    ref: 'Post',
    foreignField: '_id',
    localField: 'posts'
})

export { UserSchema }