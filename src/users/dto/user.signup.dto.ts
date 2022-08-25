import { IsEmail, IsNotEmpty } from "class-validator"

export class SignUpDto {
    @IsNotEmpty()
    username: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    phone: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    gender: string

}