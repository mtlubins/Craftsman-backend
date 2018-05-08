import {Body, Controller, Get, HttpException, Next, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public async getToken(@Body() customerCredentials) {
        console.log(customerCredentials);
        return await this.authService.createToken(customerCredentials);
    }

    @Get('error')
    public async sendError() {
        throw await new HttpException('Error gurwa', 500);
    }
}