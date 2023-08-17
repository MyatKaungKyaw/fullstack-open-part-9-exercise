import { Diagnosis, HealthCheckRating } from '../../types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseDate = (date: unknown, key: string): string => {
  if (isString(date) && isDate(date)) {
    return date;
  }
  throw new Error(`Incorrect or missing ${key}`);
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.keys(HealthCheckRating)
    .map((r) => Number(r))
    .filter((r) => !isNaN(r))
    .includes(rating);
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  const NRating = Number(rating);
  if (!isNaN(NRating) && isHealthCheckRating(NRating)) {
    return NRating;
  }
  throw new Error('Incorrect or missing HealthCheckRating');
};
