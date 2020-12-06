// Imports  from "nest"
import { Logger, Module } from '@nestjs/common';

// Imports  from "@lib/cats"
import { CatsBusinessModule } from 'libs/lib-cats/src/business/cat.business.module';
import { CatsInfraModule } from 'libs/lib-cats/src/infra/cats.infra.module';
import { CatPresenter } from 'libs/lib-cats/src/infra/presenter/cats.presenter';

@Module({
  imports: [CatsInfraModule, CatsBusinessModule],
  providers: [CatPresenter, Logger],
  exports: [CatPresenter],
})
export class CatsModule {}
