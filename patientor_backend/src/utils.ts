import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
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

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        return {
            name: parseString(object.name,'name'),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn,'SSN'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation,'occupation'),
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};