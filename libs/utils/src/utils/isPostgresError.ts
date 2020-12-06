import { QueryFailedError } from 'typeorm';

// All error codes can be found here: https://www.postgresql.org/docs/9.4/errcodes-appendix.html.
export enum PostgresErrorConditionName {
  UNIQUE_VIOLATION = '23505',
  CHECK_VIOLATION = '23514',
}

const queryFailedGuard = (err: any): err is QueryFailedError & { code: string; constraint: string } => err instanceof QueryFailedError;

/**
 * Check if the TypeORM QueryFailedError error is a Postgres error
 * with the given code and constraint.
 */
export const isPostgresError = (error: QueryFailedError, type: PostgresErrorConditionName, constraint: string): boolean => {
  if (queryFailedGuard(error)) {
    if (error.code === type && error.constraint === constraint) {
      return true;
    }
  }
  return false;
};
