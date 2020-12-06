import { diff } from 'deep-diff';
import { chain } from 'lodash';

type Record<K extends string, T> = {
  [P in K]: T;
};

export const listUpdatedAttributes = <T extends string>(
  existingItem: Record<T, any>,
  updatedItem: Record<T, any>,
  attributesToCompareList?: T[],
): T[] =>
  chain(diff(existingItem, updatedItem))
    .filter((diff) => (diff.path && diff.path[0] && attributesToCompareList ? attributesToCompareList.includes(diff.path[0]) : true))
    .uniqBy((diff) => diff.path[0])
    .map((diff) => diff.path[0])
    .value();
