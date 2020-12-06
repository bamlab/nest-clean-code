import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DogPresenter } from 'libs/lib-dogs/src/infra/presenter/dogs.presenter';
import { DogsStorageService } from 'libs/lib-dogs/src/infra/storage/dogs.storage';

@Module({
  imports: [CqrsModule],
  providers: [DogsStorageService, DogPresenter, Logger],
  exports: [CqrsModule, DogsStorageService, DogPresenter],
})
export class DogsInfraModule {}
