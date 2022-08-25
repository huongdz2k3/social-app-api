import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/users/dto/user.login.dto";
import { SignUpDto } from "src/users/dto/user.signup.dto";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async genToken(user: any) {
        const payload = { email: user.email }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signup(signUpDto: SignUpDto) {
        return await this.genToken(await this.userService.createUser(signUpDto))
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOne(loginDto.email)
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new BadRequestException('Invalid email or password')
        }
        return await this.genToken(user)
    }

}