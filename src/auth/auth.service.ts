import {Component, forwardRef, HttpException, Inject} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {ICustomerCredentials} from './customer-credentials.interface';
import {UserService} from '../user/user.service';

@Component()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) {}

    async createToken(customerCredentials: ICustomerCredentials) {
        const user = await this.userService.findUser({ email: customerCredentials.email});
        if (!user) {
            throw new HttpException('Nieprawidłowy login lub hasło', 401);
        }
        if (user.password === customerCredentials.password){
            const expiresIn = 30, secretOrKey = 'secret';
            const payload = {id: user.id};
            const token = jwt.sign(payload, secretOrKey, {expiresIn});
            return {
                access_token: token,
                user_data: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            };
        } else {
            throw new HttpException('Nieprawidłowy login lub hasło', 401);
        }
    }
    async validateUser(userPayload): Promise<boolean> {
        if (userPayload && userPayload.id) {
            return Boolean(await this.userService.findUser({id: userPayload.id}));
        }
        return false;
    }
}