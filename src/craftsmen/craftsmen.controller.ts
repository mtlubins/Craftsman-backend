import {Controller, HttpStatus, Res, Get, Post, Body} from '@nestjs/common';
import {CraftsmenService} from './craftsmen.service';
import {Craftsman} from './craftsman.interface';

@Controller('craftsmen')
export class CraftsmenController {
    constructor(private craftsmenService: CraftsmenService) {}

    @Get()
    async findAll(): Promise<Craftsman[]> {
        return await this.craftsmenService.findAll();
    }

    @Post()
    async create(@Res() response, @Body() craftsmanToCreate: Craftsman) {
        const newCraftsman = Object.assign({}, craftsmanToCreate, {id: this.craftsmenService.getRandomInt(0, 100)});
        await this.craftsmenService.create(newCraftsman);
        response.status(HttpStatus.CREATED).send();
    }
}