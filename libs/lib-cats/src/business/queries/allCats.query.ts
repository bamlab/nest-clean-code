// Import from "nest"
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Imports from "FP"
import { pipe } from 'fp-ts/lib/function';
import { chain } from 'fp-ts/lib/TaskEither';
import { executeTask, fromUnknown, perform } from '@utils';
import { ThenArg } from '@utils/types/thenArg';

// Imports from "domain"
import { Cat, catsValidator } from 'libs/lib-cats/src/domain/cat';

// Injects from "infra"
import { CatsStorageService } from 'libs/lib-cats/src/infra/storage/cats.storage';

export class AllCatsQuery implements IQuery {}

export type AllCatsQueryResult = ThenArg<ReturnType<AllCatsQueryHandler['execute']>>;

@QueryHandler(AllCatsQuery)
export class AllCatsQueryHandler implements IQueryHandler {
  constructor(private readonly catsStorageService: CatsStorageService, private readonly logger: Logger) {
    this.logger.setContext('AllCatsQueryHandler');
  }

  execute(_query: AllCatsQuery): Promise<Cat[]> {
    const task = pipe(
      perform(null, this.catsStorageService.listCats, this.logger, 'list cats'),
      chain((maybeCats) => fromUnknown(maybeCats, catsValidator, this.logger, 'cats list')),
    );

    return executeTask(task);
  }
}
