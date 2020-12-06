// Import from "nest"
import { LoggerService } from '@nestjs/common';

import { pipe } from 'fp-ts/lib/function';
import { right, chain, TaskEither } from 'fp-ts/lib/TaskEither';
import { Decoder } from 'io-ts';

import { decodeWith, handleLog } from '@utils';

export const fromUnknown = <Data>(
  unknownValue: unknown,
  validator: Decoder<unknown, Data>,
  logger: LoggerService,
  dataKind: string,
): TaskEither<Error, Data> => {
  return pipe(
    right(unknownValue),
    chain(decodeWith(validator)),
    handleLog(logger, `${dataKind} parsed successfully`, `${dataKind} corrupted or outdated`),
  );
};
