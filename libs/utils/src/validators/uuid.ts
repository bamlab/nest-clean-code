import * as t from 'io-ts';
import * as tts from 'io-ts-types';

const uuidRegex = /^\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/;

export interface UuidBrand {
  readonly Uuid: unique symbol;
}

const isUuid = (maybeUuid: string): maybeUuid is t.Branded<string, UuidBrand> => {
  return uuidRegex.test(maybeUuid);
};
// we create a branded type

// TODO: discuss with the team to abandon uuidValidator as it breaks the branded type (and we can confuse for instance patient and wound ids)
/**
 * @deprecated: use more specific validator
 */
export const uuidValidator = t.brand(
  // that is a string
  t.string,
  // and is a uuid
  (s): s is t.Branded<string, UuidBrand> => isUuid(s),
  // called Uuid
  'Uuid',
);

// TODO: discuss with the team to abandon uuidValidator as it breaks the branded type (and we can confuse for instance patient and wound ids)
/**
 * @deprecated: use more specific validator
 */
export const uuidsValidator = t.array(uuidValidator);
// TODO: discuss with the team to abandon uuidValidator as it breaks the branded type (and we can confuse for instance patient and wound ids)
/**
 * @deprecated: use more specific validator
 */
export const nonEmptyUuidsValidator = tts.nonEmptyArray(uuidValidator);
// TODO: discuss with the team to abandon uuidValidator as it breaks the branded type (and we can confuse for instance patient and wound ids)
/**
 * @deprecated: use more specific validator
 */
export type Uuid = t.TypeOf<typeof uuidValidator>;
