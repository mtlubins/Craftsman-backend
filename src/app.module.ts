import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CraftsmenModule} from './craftsmen/craftsmen.module';
import {CorsMiddleware} from './cors.middleware';

@Module({
  imports: [CraftsmenModule]
})
export class ApplicationModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(CorsMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
