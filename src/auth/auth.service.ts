import {Component, HttpException} from '@nestjs/common';
import {craftsmen} from '../craftsmen-mock-data';
import * as jwt from 'jsonwebtoken';
import {ICraftsman} from '../craftsmen/craftsman.interface';
import {ICustomerCredentials} from './customer-credentials.interface';

@Component()
export class AuthService {
    async createToken(customerCredentials: ICustomerCredentials) {
        const user = craftsmen[craftsmen.findIndex( item => item.login === customerCredentials.login)];
        if (!user) {
            throw new HttpException('noł juser', 401);
        }
        if (user.password === customerCredentials.password){
            const expiresIn = 60 * 60, secretOrKey = 'secret';
            const payload = {id: user.id};
            const token = jwt.sign(payload, secretOrKey, {expiresIn});
            return {
                expires_in: expiresIn,
                access_token: token,
            };
        } else {
            throw new HttpException('zły pasłord', 401);
        }
    }
    async validateUser(signedUser): Promise<boolean> {
        console.log(signedUser);
        if (signedUser && signedUser.id) {
            return Boolean(craftsmen[craftsmen.findIndex( item => item.id === signedUser.id)]);
        }
        return false;
    }

    async getAuthorizedUser(userId): Promise<ICraftsman> {
        console.log(userId);
        return craftsmen[craftsmen.findIndex( item => item.id === userId)];
    }
}