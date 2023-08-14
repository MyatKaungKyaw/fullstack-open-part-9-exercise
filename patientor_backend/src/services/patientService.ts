import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry, } from '../types';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const getPatientWithId = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if (patient) return patient;
    throw new Error('Patient with given id is not foud.');
};

const addPatients = (patient: NewPatient): Patient => {
    const newPatient: Patient = {
        id: uuidv4(),
        entries: patient.entries.map(e => ({
            id: uuidv4(),
            ...e,
        })),
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        name: patient.name,
        occupation: patient.occupation,
        ssn: patient.ssn,
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const newEntry: Entry = {
        id: uuidv4(),
        ...entry,
    };

    const patientIndex = patients.findIndex(p => p.id === patientId);
    patients[patientIndex].entries.push(newEntry);

    return newEntry;
};

export default {
    getPatients,
    addPatients,
    getPatientWithId,
    addEntry,
};