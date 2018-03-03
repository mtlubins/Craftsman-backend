import {Component} from '@nestjs/common';
import {Craftsman} from './craftsman.interface';
import {craftsmen} from '../CraftsmenMockData';
@Component()
export class CraftsmenService {
    private tempCraftsman: Craftsman = {
        id: 222,
        login: 'dupa',
        password: 'dupa',
        companyName: 'dupa',
    };
    constructor() {
        craftsmen.push(this.tempCraftsman);
    }

    async findAll(): Promise<Craftsman[]> {
        return craftsmen;
    }

    async create(craftsman: Craftsman) {
        craftsmen.push(craftsman);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}