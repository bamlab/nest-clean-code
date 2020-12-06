// Import from "nest"
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

// Import from "fp"
import { right, TaskEither } from 'fp-ts/lib/TaskEither';

@Injectable()
export class CatsStorageService {
  constructor(private readonly logger: Logger) {
    this.logger.setContext('CatsStorageService');
  }

  listCats = (): TaskEither<Error, string[]> => {
    return right(['Garfield', 'Patenrond']);
  };
}
