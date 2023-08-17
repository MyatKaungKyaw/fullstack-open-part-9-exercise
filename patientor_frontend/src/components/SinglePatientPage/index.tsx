import { useEffect, useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import { Gender, NewEntry, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import patientService from '../../services/patients';
import Entries from '../EntryListPage';
import AddEntryModal from '../AddEntryModal/index';

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    if (typeof id === 'string') {
      patientService.getPatientWithId(id).then((p) => {
        setPatient(p);
      });
    }
  }, [id]);

  if (!id && typeof id !== 'string')
    return (
      <div>
        <Typography>Provided id is not valid</Typography>
      </div>
    );

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      const newEntry = await patientService.createEntries(id, entry);

      if (patient == null) return;
      const entries = patient.entries.concat(newEntry);
      setPatient({
        ...patient,
        entries,
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const closeEntryModal = () => {
    setEntryModalOpen(false);
    setError(undefined);
  };

  const openEntryModal = (): void => setEntryModalOpen(true);

  const showError = (err: string): void => setError(err);

  if (typeof patient === 'undefined') {
    return (
      <div>
        <Typography>Loading Patient data ...</Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5">
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
      {entryModalOpen && (
        <AddEntryModal
          onClose={closeEntryModal}
          onSubmit={submitNewEntry}
          showError={showError}
        />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!entryModalOpen && (
        <Button
          variant="contained"
          onClick={() => {
            openEntryModal();
          }}
        >
          Add New Entry
        </Button>
      )}
      {patient.entries.length !== 0 && <Entries entries={patient.entries} />}
    </>
  );
};
export default SinglePatientPage;
