import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';

import { NonSensitivePatient, NewPatient, Patient } from '../types';

const getPatients = ():NonSensitivePatient[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation,entries})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const getPatientWithId = (id:string):Patient =>{
    const patient = patients.find(p => p.id === id);
    if(patient) return patient;
    throw new Error('Patient with given id is not foud.');
};

const addPatients = (entry:NewPatient):Patient => {
    const newPatient:Patient = {
        id : uuidv4(),
        entries: entry.entries.map(e => ({
            id: uuidv4(),
            ...e,
        })),
        dateOfBirth: entry.dateOfBirth,
        gender: entry.gender,
        name:entry.name,
        occupation:entry.occupation,
        ssn:entry.ssn,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatients,
    getPatientWithId,
};