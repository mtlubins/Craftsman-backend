import {Component} from '@nestjs/common';
import {Craftsman} from './craftsman.interface';
@Component()
export class CraftsmenService {
    private tempCraftsman: Craftsman = {
        id: 'dupa',
        login: 'dupa',
        password: 'dupa',
        companyName: 'dupa',
    };
    private readonly craftsmen: Craftsman[] = [];
    constructor() {
        this.craftsmen.push(this.tempCraftsman);
    }

    async findAll(): Promise<Craftsman[]> {
        return this.craftsmen;
    }

    async create(craftsman: Craftsman) {
        this.craftsmen.push(craftsman);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}