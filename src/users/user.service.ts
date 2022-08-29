import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "./dto/user.signup.dto";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async findOne(email: string): Promise<any> {
        return await this.userModel.findOne({ email })
    }

    async createUser(signUpDto: SignUpDto): Promise<any> {
        try {
            signUpDto.password = await bcrypt.hash(signUpDto.password, 12)
            return await this.userModel.create(signUpDto)
        } catch (err) {
            throw new BadRequestException(err)
        }

    }

    async findUserByCond(searchString: string) {
        return await this.userModel.find({ username: { $regex: searchString } })
    }
}