import * as t from 'io-ts';

export const booleanFromIntValidator = new t.Type<boolean, boolean, unknown>(
  'booleanFromInt',
  // type guard: is a boolean
  (u): u is boolean => typeof u === 'boolean',
  // validate: is either 0 or 1
  (u, c) => (u === 0 || u === 1 ? t.success(!!u) : t.failure(u, c)),
  // encode: we ignore the encoding part
  t.identity,
);
