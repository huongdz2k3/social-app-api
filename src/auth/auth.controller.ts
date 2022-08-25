import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "src/users/dto/user.login.dto";
import { SignUpDto } from "src/users/dto/user.signup.dto";
import { AuthService } from "./auth.service";

@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto) {
        return await this.authService.signup(signUpDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto)
    }
}