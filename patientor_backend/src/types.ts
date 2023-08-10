type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string,
}

export interface Patient {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:Gender,
    occupation:string,
    entries:Entry[]|[],
}

export type NonSensitivePatient = Omit<Patient,'ssn'|'entries'>;

export interface  NewPatient extends Omit<Patient,'id'|'entries'>{
    entries: NewEntry[];
}

export enum Gender{
    Male='male',
    Female='female',
    Other='other',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckType {
    HealthCheck='HealthCheck',
    OccupationalHealthCare='OccupationalHealthcare',
    Hospital='Hospital',    
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: HealthCheckType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type:HealthCheckType.OccupationalHealthCare;
    employerName:string;
    sickLeave?:{
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    type:HealthCheckType.Hospital;
    discharge:{
        date:string;
        criteria:string;
    }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry; 

export type NewEntry = UnionOmit<Entry,'id'>;