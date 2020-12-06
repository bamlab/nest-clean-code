import { Logger, Module } from '@nestjs/common';

import { DogsInfraModule as DogsInfraModule } from 'libs/lib-dogs/src/infra/dogs.infra.module';

// Import from "dogs-business"
import { AllDogsQueryHandler } from './queries/allDogs.query';

const queryHandlers = [AllDogsQueryHandler];

@Module({
  imports: [DogsInfraModule],
  providers: [...queryHandlers, Logger],
})
export class DogsBusinessModule {}
