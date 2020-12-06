export const dogValidator = {
  validate: (maybeDog: unknown) => typeof maybeDog === 'string' && maybeDog,
};

export const dogsValidator = {
  validate: (maybeDogs: unknown[]) => maybeDogs.map(dogValidator.validate),
};

export type Dog = string;
