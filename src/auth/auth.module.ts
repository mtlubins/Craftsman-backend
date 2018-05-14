import * as passport from 'passport';
import { JwtStrategy } from './passport/jwt.strategy';
import {forwardRef, MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from '../user/user.module';

@Module({
    imports: [forwardRef(() => UserModule)],
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/craftsmen/me', method: RequestMethod.GET },
                             { path: '/user/me', method: RequestMethod.GET});
    }
}