import * as t from 'io-ts';

export const isoStringFromDateValidator = new t.Type<string, string, unknown>(
  'ISOStringFromDate',
  // type guard: is a string
  (u): u is string => typeof u === 'string',
  // validate: is a date formatted as an ISO String
  (u, c) => (u instanceof Date ? t.success(u.toISOString()) : t.failure(u, c)),
  // encode: we ignore the encoding part
  t.identity,
);

export type ISOStringFromDate = t.TypeOf<typeof isoStringFromDateValidator>;
