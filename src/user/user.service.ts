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

    async createUser(userData: User) {
        console.log('data from body');
        console.log(userData);
        const newUser = new User();
        newUser.firstName = userData.firstName;
        newUser.lastName = userData.lastName;
        newUser.age = userData.age;
        console.log('data from bnew user');
        console.log(newUser);
        console.log(this.userRepository.create(newUser));
    }
}
