import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async createUser(@Res() response, @Body() userToCreateData: User) {
        await this.userService.createUser(userToCreateData);
        // response.status(HttpStatus.CREATED).send();
    }
}