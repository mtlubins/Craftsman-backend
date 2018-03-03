import {Module} from '@nestjs/common';
import {CraftsmenController} from "./craftsmen.controller";
import {CraftsmenService} from "./craftsmen.service";

@Module({
    controllers: [CraftsmenController],
    components: [CraftsmenService]
})
export class CraftsmenModule {}