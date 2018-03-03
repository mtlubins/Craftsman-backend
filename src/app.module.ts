import { Module } from '@nestjs/common';
import {CraftsmenModule} from './craftsmen/craftsmen.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [CraftsmenModule, AuthModule]
})
export class ApplicationModule {}
