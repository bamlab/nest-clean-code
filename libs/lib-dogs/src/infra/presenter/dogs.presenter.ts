// Imports "nest"
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

// Imports "@lib/dogs"
import { Dog } from 'libs/lib-dogs/src/domain/dog';
import { AllDogsQuery, AllDogsQueryResult } from 'libs/lib-dogs/src/business/queries/allDogs.query';

// Import "core" libs
import { Logger } from '@nestjs/common';

@Injectable()
export class DogPresenter {
  constructor(private readonly queryBus: QueryBus, private readonly logger: Logger) {}

  listAllDogs = (): Promise<Dog[]> => {
    const query = new AllDogsQuery();
    return this.queryBus.execute<AllDogsQuery, AllDogsQueryResult>(query);
  };
}
