import { Decoder } from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { pipe } from 'fp-ts/lib/function';
import * as Either from 'fp-ts/lib/Either';
import * as TaskEither from 'fp-ts/lib/TaskEither';

import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Decode, in TaskEither scope using io-ts.
 * In fact, io-ts:
 * - works synchronously (`Task` and not `TaskEither`)
 * - returns `Errors` as left which is typically `Error[]`
 * In order to use it more easily, this small helper makes the mandatory conversion
 *
 * @param validator : an io-ts validator
 */
export const decodeWith = <Input, Data>(validator: Decoder<Input, Data>, errorMessage = 'The data is wrongly formatted') => (
  data: Input,
): TaskEither.TaskEither<Error, Data> => {
  return pipe(
    data,
    validator.decode,
    // TODO: generic ValidationError
    Either.mapLeft((errors) => new UnprocessableEntityException(failure(errors), errorMessage)),
    TaskEither.fromEither,
  );
};
