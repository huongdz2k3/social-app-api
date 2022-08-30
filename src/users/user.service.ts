import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "./dto/user.signup.dto";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async findOne(email?: string): Promise<any> {
        if (email) {
            return await this.userModel.findOne({ email })
        }
    }
    async findById(id): Promise<any> {
        return await this.userModel.findById(id)
    }

    async createUser(signUpDto: SignUpDto): Promise<any> {
        try {
            signUpDto.password = await bcrypt.hash(signUpDto.password, 12)
            signUpDto.searching = signUpDto.username + signUpDto.phone + signUpDto.gender + signUpDto.email + signUpDto.address
            return await this.userModel.create(signUpDto)
        } catch (err) {
            throw new BadRequestException(err)
        }

    }

    async findUserByCond(searchString: string) {
        return await this.userModel.find({ searching: { $regex: searchString } })
    }
}
//add pro searching