import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('me')
    async findOne(): Promise<any> {
       return await this.userService.findUser({id: 14});
    }

    @Post()
    async createUser(@Res() response, @Body() userToCreateData: User) {
        // Tutej jeszcze będzie strażnik (chyba middleware), który będzie validował body
        await this.userService.createUser(userToCreateData);
        response.status(HttpStatus.CREATED).send({});
        // A tutej jak ridżekt to jakiś inny http status
    }
}