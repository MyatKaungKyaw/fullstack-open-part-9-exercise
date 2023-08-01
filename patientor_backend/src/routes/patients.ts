import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatients(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;