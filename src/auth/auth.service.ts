import {Component, HttpException} from '@nestjs/common';
import {craftsmen} from '../craftsmen-mock-data';
import * as jwt from 'jsonwebtoken';
import {ICraftsman} from '../craftsmen/craftsman.interface';
import {ICustomerCredentials} from './customer-credentials.interface';
import {UserService} from '../user/user.service';

@Component()
export class AuthService {
    constructor(private userService: UserService) {}

    async createToken(customerCredentials: ICustomerCredentials) {
        const user = await this.userService.findUser(customerCredentials.email);
        console.log(user);
        if (!user) {
            throw new HttpException('noł juser', 401);
        }
        if (user.password === customerCredentials.password){
            const expiresIn = 60 * 60, secretOrKey = 'secret';
            const payload = {id: user.id};
            const token = jwt.sign(payload, secretOrKey, {expiresIn});
            return {
                access_token: token,
            };
        } else {
            throw new HttpException('zły pasłord', 401);
        }
    }
    async validateUser(signedUser): Promise<boolean> {
        console.log('validateUser');
        console.log(signedUser);
        if (signedUser) {
            return Boolean(await this.userService.findUser({id: signedUser}));
        }
        return false;
    }
}