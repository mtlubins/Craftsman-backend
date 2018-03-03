import {Component} from '@nestjs/common';
import {craftsmen} from '../CraftsmenMockData';
import * as jwt from 'jsonwebtoken';

@Component()
export class AuthService {
    async createToken(customerCredentials) {
        const user = craftsmen[craftsmen.findIndex( item => item.login === customerCredentials.login)];
        if (!user) {
                return 5;
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
            return 6;
        }
    }
}