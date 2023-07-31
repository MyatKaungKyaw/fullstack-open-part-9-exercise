import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';

import { NonSensitivePatient, NewPatient, Patient } from '../types';

const getPatients = ():NonSensitivePatient[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatients = (entry:NewPatient):Patient => {
    const newPatient = {
        id : uuidv4(),
        ...entry,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatients,
};