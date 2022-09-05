import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
/*
    Custom imports for AuthService, jwt secret, etc...
*/
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants/constants';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();
        const cookies: string[] = client.handshake.headers.cookie.split('; ');
        const authToken = cookies.find(cookie => cookie.startsWith('jwt')).split('=')[1];
        const user = jwt.verify(authToken, jwtConstants.secret)
        // Bonus if you need to access your user after the guard 
        context.switchToWs().getData().user = user;
        return Boolean(user);
    }
}