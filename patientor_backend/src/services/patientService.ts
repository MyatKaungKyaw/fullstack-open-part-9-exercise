import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';

import { NonSensitivePatient, NewPatient, Patient, } from '../types';

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

const addPatients = (patient:NewPatient):Patient => {
    const newPatient:Patient = {
        id : uuidv4(),
        entries: patient.entries.map(e => ({
            id: uuidv4(),
            ...e,
        })),
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        name:patient.name,
        occupation:patient.occupation,
        ssn:patient.ssn,
    };
    patients.push(newPatient);
    return newPatient;
};

// const array1: object[] = [{ key: 'value1' }];
// const array2: object[] = [{ key: 'value2' }];

// const concatenatedArray = array1.concat(array2);

// const addEntry = (patientId:string, entry:NewEntry):Entry => {
//    const patient = getPatientWithId(patientId);
//    patients = patients.map(p => {
//     if(p.id === patientId){
//         if(p.entries.length === 0){
//             p.entries = p.entries.concat({
//             id:uuidv4(),
//             ...entry,
//         });
//     }
//     }
//    });
// };

export default {
    getPatients,
    addPatients,
    getPatientWithId,
    // addEntry,
};