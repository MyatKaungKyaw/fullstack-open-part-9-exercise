import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import { Gender, Patient } from '../../types';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import Entries from './Entries';

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  if (!id && typeof id !== 'string')
    return (
      <div>
        <Typography>Provided id is not valid</Typography>
      </div>
    );
  patientService.getPatientWithId(id).then((p) => {
    setPatient(p);
  });

  if (typeof patient === 'undefined') {
    return (
      <div>
        <Typography>Loading Patient data ...</Typography>
      </div>
    );
  }

  return (
    <Container>
      <Typography variant="h2">
        {patient.name}
        {patient.gender === Gender.Female ? (
          <FemaleRoundedIcon />
        ) : patient.gender === Gender.Male ? (
          <MaleRoundedIcon />
        ) : null}
      </Typography>
      {patient?.ssn && (
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
      )}
      {patient?.dateOfBirth && (
        <Typography variant="body1">date of birth: {patient.ssn}</Typography>
      )}
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      {patient.entries.length !== 0 && <Entries entries={patient.entries} />}
    </Container>
  );
};
export default SinglePatientPage;
