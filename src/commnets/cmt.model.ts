import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type CommnetDocument = Commnet & Document;
@Schema()
export class Commnet {
    @Prop()
    content: string
    @Prop()
    postId: string
    @Prop()
    userEmail: string
    @Prop()
    img: string
}
const CommnetSchema = SchemaFactory.createForClass(Commnet)

export { CommnetSchema }