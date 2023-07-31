import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/',(_req,res) => {
    res.send(patientService.getPatients());
});

router.post('/',(req,res)=>{
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
        const {name,dateOfBirth,ssn,gender,occupation} = req.body;
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient = patientService.addPatients({name, dateOfBirth, ssn, gender, occupation, });
        res.json(newPatient);
    } catch(error:unknown){
        let errorMessage = 'something went wrong';
        if(error instanceof Error){
            errorMessage = 'Error: '+error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;