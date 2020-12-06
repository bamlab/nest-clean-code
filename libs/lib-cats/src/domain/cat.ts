import * as t from 'io-ts';

export const catValidator = t.string;

export const catsValidator = t.array(catValidator);

export type Cat = t.TypeOf<typeof catValidator>;
