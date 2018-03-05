import {Component} from '@nestjs/common';
import {Craftsman} from './craftsman.interface';
import {craftsmen} from '../CraftsmenMockData';
@Component()
export class CraftsmenService {

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