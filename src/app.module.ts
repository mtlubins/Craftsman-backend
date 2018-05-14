import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CraftsmenModule} from './craftsmen/craftsmen.module';
import {CorsMiddleware} from './cors.middleware';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      CraftsmenModule,
      UserModule
  ],
})
export class ApplicationModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(CorsMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
