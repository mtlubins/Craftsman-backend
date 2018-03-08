import {Body, Controller, Get, Next, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('token')
    public async getToken(@Body() customerCredentials) {
        return await this.authService.createToken(customerCredentials);
    }
}