import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('token')
    public async getToken(@Body() customerCredentials) {
        const response = await this.authService.createToken(customerCredentials);
        if (response === 5) {
            throw new HttpException('noł juser', 401);
        }
        if (response === 6) {
            throw new HttpException('zły pasłord', 401);
        }
        return response;
    }
}