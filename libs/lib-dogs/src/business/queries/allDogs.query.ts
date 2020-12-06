// Import from "nest"
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ThenArg } from '@utils/types/thenArg';

// Imports from "domain"
import { Dog, dogsValidator } from 'libs/lib-dogs/src/domain/dog';

// Injects from "infra"
import { DogsStorageService } from 'libs/lib-dogs/src/infra/storage/dogs.storage';

export class AllDogsQuery implements IQuery {}

export type AllDogsQueryResult = ThenArg<ReturnType<AllDogsQueryHandler['execute']>>;

@QueryHandler(AllDogsQuery)
export class AllDogsQueryHandler implements IQueryHandler {
  constructor(private readonly dogsStorageService: DogsStorageService, private readonly logger: Logger) {
    this.logger.setContext('AllDogsQueryHandler');
  }

  async execute(_query: AllDogsQuery): Promise<Dog[]> {
    const maybeDogs = await this.dogsStorageService.listDogs();
    this.logger.log('list dogs');
    const dogs = dogsValidator.validate(maybeDogs);
    this.logger.log('dogs are ok');

    return dogs;
  }
}
