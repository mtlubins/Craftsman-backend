import {Component} from '@nestjs/common';
import {ICraftsman} from './craftsman.interface';
import {craftsmen} from '../craftsmen-mock-data';
@Component()
export class CraftsmenService {

    async findAll(): Promise<ICraftsman[]> {
        return craftsmen;
    }

    async create(craftsman: ICraftsman) {
        craftsmen.push(craftsman);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}