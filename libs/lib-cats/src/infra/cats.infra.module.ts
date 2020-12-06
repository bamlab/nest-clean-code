import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CatPresenter } from 'libs/lib-cats/src/infra/presenter/cats.presenter';
import { CatsStorageService } from 'libs/lib-cats/src/infra/storage/cats.storage';

@Module({
  imports: [CqrsModule],
  providers: [CatsStorageService, CatPresenter, Logger],
  exports: [CqrsModule, CatsStorageService, CatPresenter],
})
export class CatsInfraModule {}
