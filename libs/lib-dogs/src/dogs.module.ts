// Imports  from "nest"
import { Logger, Module } from '@nestjs/common';

// Imports  from "@lib/dogs"
import { DogsBusinessModule } from 'libs/lib-dogs/src/business/dog.business.module';
import { DogsInfraModule } from 'libs/lib-dogs/src/infra/dogs.infra.module';
import { DogPresenter } from 'libs/lib-dogs/src/infra/presenter/dogs.presenter';

@Module({
  imports: [DogsInfraModule, DogsBusinessModule],
  providers: [DogPresenter, Logger],
  exports: [DogPresenter],
})
export class DogsModule {}
