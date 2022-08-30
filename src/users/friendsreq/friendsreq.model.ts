import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FriendsReqDocument = FriendsReq & Document
@Schema()
export class FriendsReq {
    @Prop()
    userreq: string
    @Prop()
    userreceipt: string
    @Prop({ default: "requested" })
    status: string
}
export const FriendsReqSchema = SchemaFactory.createForClass(FriendsReq)