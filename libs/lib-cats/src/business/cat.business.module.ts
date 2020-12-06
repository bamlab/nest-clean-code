import { Logger, Module } from '@nestjs/common';

import { CatsInfraModule } from 'libs/lib-cats/src/infra/cats.infra.module';

// Import from "cat-business"
import { AllCatsQueryHandler } from './queries/allCats.query';

const queryHandlers = [AllCatsQueryHandler];

@Module({
  imports: [CatsInfraModule],
  providers: [...queryHandlers, Logger],
})
export class CatsBusinessModule {}
