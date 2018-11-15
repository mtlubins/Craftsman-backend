import {Body, Controller, forwardRef, Get, HttpException, HttpStatus, Inject, Post, Req, Res} from '@nestjs/common';
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
    createUser(@Res() response, @Body() userToCreate: User) {
        // Tutej jeszcze będzie strażnik (chyba middleware), który będzie validował body
        this.userService.createUser(userToCreate)
            .then(async () => {
                response.status(HttpStatus.CREATED).send(
                    await this.authService.createToken({
                        email: userToCreate.email,
                        password: userToCreate.password
                    }));
            }, () => {
                throw new HttpException('Błąd podczas rejestracji. Proszę spróbować ponownie.', 401);
            });
    }
}