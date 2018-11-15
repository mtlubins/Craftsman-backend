import {Component} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';

@Component()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    createUser(userData: User): Promise<any> {
        const newUser = new User(userData);
        return this.userRepository.save(newUser);
    }

    async findUser(any): Promise<User> { // RORO HERE
        return await this.userRepository.findOne(any);
    }
}
