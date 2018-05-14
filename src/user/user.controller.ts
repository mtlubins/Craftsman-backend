import {Body, Controller, forwardRef, Get, HttpStatus, Inject, Post, Req, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';
import {AuthService} from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
                @Inject(forwardRef(() => AuthService))
                private authService: AuthService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get('me')
    async findOne(@Req() req): Promise<User> {
        return await this.userService.findUser({id: req.user.id});
    }

    @Post()
    async createUser(@Res() response, @Body() userToCreate: User) {
        // Tutej jeszcze będzie strażnik (chyba middleware), który będzie validował body
        await this.userService.createUser(userToCreate);
        await response.status(HttpStatus.CREATED).send(await this.authService
            .createToken({email: userToCreate.email,
                password: userToCreate.password}));
        // A tutej jak ridżekt to jakiś inny http status
        // Tylko jak tu zrobić didżekt maaaaan?
        //  ZNOWU NIE MA ERROR HANDLING HELOŁ?
    }
}