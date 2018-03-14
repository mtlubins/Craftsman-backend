import {Controller, HttpStatus, Res, Get, Post, Body, Req} from '@nestjs/common';
import {CraftsmenService} from './craftsmen.service';
import {ICraftsman} from './craftsman.interface';
import {AuthService} from '../auth/auth.service';

@Controller('craftsmen')
export class CraftsmenController {
    constructor(private craftsmenService: CraftsmenService,
                private  authService: AuthService) {}

    @Get()
    async findAll(): Promise<ICraftsman[]> {
        return await this.craftsmenService.findAll();
    }

    @Get('me')
    async getCraftsman(@Req() req): Promise<ICraftsman> {
        console.log(req.user);
        return await this.authService.getAuthorizedUser(req.user);
    }

    @Post()
    async create(@Res() response, @Body() craftsmanToCreate: ICraftsman) {
        const newCraftsman = Object.assign({}, craftsmanToCreate, {id: this.craftsmenService.getRandomInt(0, 100)});
        await this.craftsmenService.create(newCraftsman);
        response.status(HttpStatus.CREATED).send();
    }
}