import {
  Gender,
  EntryType,
  NewEntry,
  NewPatient,
  HealthCheckRating,
  Diagnosis,
  BaseEntry,
  Patient,
  Entry,
} from './types';

const parseBaseEntry = (entry: object): Omit<BaseEntry, 'id'> => {
  if (
    'type' in entry &&
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry
  ) {
    return {
      description: parseString(entry.description, 'description'),
      date: parseDate(entry.date, 'date'),
      specialist: parseString(entry.specialist, 'specialist'),
      ...('diagnosisCodes' in entry && {
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
      }),
    };
  }
  throw new Error('Incorrect Entry: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const parseNewEntry = (entry: unknown): NewEntry => {
  if (isObject(entry) && 'type' in entry && isEntryType(entry.type)) {
    switch (entry.type) {
      case EntryType.HealthCheck:
        return parseHealthCheckEntry(entry);
      case EntryType.OccupationalHealthCare:
        return parseOccupationalHealthCareEntry(entry);
      case EntryType.Hospital:
        return parseHospitalEntry(entry);
    }
  }
  throw new Error('Incorrect Entry: some fields are missing');
};

const isEntryType = (type: unknown): type is EntryType => {
  return (
    typeof type === 'string' &&
    Object.values(EntryType)
      .map((h) => h.toString())
      .includes(type)
  );
};

const parseHospitalEntry = (entry: object): NewEntry => {
  if (
    'type' in entry &&
    isEntryType(entry.type) &&
    entry.type === EntryType.Hospital &&
    'discharge' in entry &&
    isObject(entry.discharge) &&
    'date' in entry.discharge &&
    'criteria' in entry.discharge
  ) {
    return {
      ...parseBaseEntry(entry),
      type: entry.type,
      discharge: {
        date: parseDate(entry.discharge.date, 'date'),
        criteria: parseString(entry.discharge.criteria, 'criteria'),
      },
    };
  }
  throw new Error('Incorrect or missing HospitalEntry');
};

const parseOccupationalHealthCareEntry = (entry: object): NewEntry => {
  if (
    'type' in entry &&
    isEntryType(entry.type) &&
    entry.type === EntryType.OccupationalHealthCare &&
    'employerName' in entry
  ) {
    return {
      ...parseBaseEntry(entry),
      type: entry.type,
      employerName: parseString(entry.employerName, 'employerName'),
      ...('sickLeave' in entry &&
        isObject(entry.sickLeave) &&
        'startDate' in entry.sickLeave &&
        'endDate' in entry.sickLeave && {
          sickLeave: {
            startDate: parseDate(entry.sickLeave.startDate, 'startDate'),
            endDate: parseDate(entry.sickLeave.endDate, 'endDate'),
          },
        }),
    };
  }
  throw new Error('Incorrect or missing OccupationalHealthCareEntry');
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.keys(HealthCheckRating)
    .map((r) => Number(r))
    .filter((r) => !isNaN(r))
    .includes(rating);
};

const parseHealthCheckEntry = (entry: object): NewEntry => {
  if (
    'type' in entry &&
    isEntryType(entry.type) &&
    entry.type === EntryType.HealthCheck &&
    'healthCheckRating' in entry &&
    !isNaN(Number(entry.healthCheckRating)) &&
    isHealthCheckRating(Number(entry.healthCheckRating))
  ) {
    return {
      ...parseBaseEntry(entry),
      type: entry.type,
      healthCheckRating: Number(entry.healthCheckRating),
    };
  }
  throw new Error('Incorrect or missing HealthCheckEntry');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isObject = (obj: unknown): obj is object => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

const parseString = (str: unknown, key: string): string => {
  if (isString(str)) {
    return str;
  }
  throw new Error(`Incorrect or missing ${key}`);
};

const parseDate = (date: unknown, key: string): string => {
  if (isString(date) && isDate(date)) {
    return date;
  }
  throw new Error(`Incorrect or missing ${key}`);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (isString(gender) && isGender(gender)) {
    return gender;
  }
  throw new Error('Incorrect or missing gender');
};

const parseNewEntries = (entries: unknown): NewEntry[] => {
  if (Array.isArray(entries)) {
    if (entries.length == 0) return [];
    return entries.map((entry) => parseNewEntry(entry));
  }
  throw new Error(`Incorrect or missing entries`);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (Array.isArray(entries)) {
    if (entries.length == 0) return [];
    return entries.map((entry) => ({
      id: parseString(entry?.id, 'id'),
      ...parseNewEntry(entry),
    }));
  }
  throw new Error(`Incorrect or missing entries`);
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    return {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'SSN'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: parseNewEntries(object.entries),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

export const toPatient = (object: unknown): Patient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect data');
  }

  if (
    'id' in object &&
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    return {
      id: parseString(object.id, 'id'),
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'SSN'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: parseEntries(object.entries),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};
