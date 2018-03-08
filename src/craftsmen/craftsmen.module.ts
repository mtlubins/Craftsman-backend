import {Module} from '@nestjs/common';
import {CraftsmenController} from "./craftsmen.controller";
import {CraftsmenService} from "./craftsmen.service";
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [CraftsmenController],
    components: [CraftsmenService]
})
export class CraftsmenModule {}