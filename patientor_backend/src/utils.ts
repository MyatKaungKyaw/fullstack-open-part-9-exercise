import { Gender, HealthCheckType, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isObject = (obj:unknown): obj is object => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

const parseString = (str: unknown, key: string): string => {
    if (isString(str)) {
        return str;
    }
    throw new Error(`Incorrect or missing ${key}`);
};

const parseDateOfBirth = (dateOfBirth: unknown): string =>{
    if(isString(dateOfBirth) && isDate(dateOfBirth)){
        return dateOfBirth;
    }
    throw new Error('Incorrect or missing date');
};

const isDate = (date:string):boolean =>{
    return Boolean(Date.parse(date));
};

const isGender = (gender: string) : gender is Gender =>{
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender=(gender:unknown) : Gender => {
    if(isString(gender) && isGender(gender)){
        return gender;
    }
    throw new Error('Incorrect or missing gender');
};

const isNewEntries = (entries:Array<unknown>):entries is NewEntry[] =>{
    return entries.every(entry => (isObject(entry) &&
      'type' in entry && 
      typeof entry.type === 'string' && 
      Object.values(HealthCheckType).map(h => h.toString()).includes(entry.type)));
};

const parseNewEntries = (entries:unknown): NewEntry[]|[]=>{
    console.log(entries);
    if(Array.isArray(entries)){ 
        if(isNewEntries.length == 0) return [];
        if(isNewEntries(entries)){
            return entries;
        }
    }
    throw new Error(`Incorrect or missing entries`);
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        return {
            name: parseString(object.name,'name'),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn,'SSN'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation,'occupation'),
            entries: parseNewEntries(object.entries),
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};