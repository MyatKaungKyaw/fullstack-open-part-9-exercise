import express from 'express';

import patientService from '../services/patientService';
import { parseNewEntry, toNewPatient } from '../utils';

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

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatientWithId(req.params.id);
        res.json(patient);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = parseNewEntry(req.body);
        const entry = patientService.addEntry(req.params.id, newEntry);
        res.json(entry);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage = 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;