// Imports "nest"
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

// Imports "fp"
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

// Imports "@lib/cats"
import { Cat } from 'libs/lib-cats/src/domain/cat';
import { AllCatsQuery, AllCatsQueryResult } from 'libs/lib-cats/src/business/queries/allCats.query';

// Import "core" libs
import { Logger } from '@nestjs/common';

@Injectable()
export class CatPresenter {
  constructor(private readonly queryBus: QueryBus, private readonly logger: Logger) {}

  listAllCats = (): TaskEither<Error, Cat[]> => {
    const listAllCatsTask = tryCatch(
      async () => {
        const query = new AllCatsQuery();
        return this.queryBus.execute<AllCatsQuery, AllCatsQueryResult>(query);
      },
      // TODO: do not return error but 1) log it and 2) return a specific exception
      (error: Error) => error,
    );

    return listAllCatsTask;
  };
}
