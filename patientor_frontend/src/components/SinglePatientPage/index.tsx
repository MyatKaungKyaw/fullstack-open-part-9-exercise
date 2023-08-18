import { useEffect, useState } from 'react';
import { Alert, Select, SelectChangeEvent, Typography } from '@mui/material';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import { EntryType, Gender, NewEntry, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import patientService from '../../services/patients';
import Entries from '../EntryListPage';
import AddEntryModal from '../AddEntryModal/index';
import { parseEntryType } from '../AddEntryModal/utils';

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false);
  const [entryFormSelect, setEntryFormSelect] = useState<EntryType | ''>('');

  const { id } = useParams();

  const entryTypeArr = Object.entries(EntryType);

  useEffect(() => {
    if (typeof id === 'string') {
      patientService.getPatientWithId(id).then((p) => {
        setPatient(p);
      });
    }
  }, [id]);

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      if (id == null) {
        throw new Error(`Can't add entry with unidentify patient id.`);
      }
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

  const entryFormSelectChangeHandler = (event: SelectChangeEvent) => {
    try {
      const entryType = parseEntryType(event.target.value);
      setEntryFormSelect(entryType);
      setEntryModalOpen(true);
      setError(undefined);
    } catch (e: unknown) {
      let message = 'something went wrong';
      if (e instanceof Error) {
        message = e.message;
      }
      showError(message);
    }
  };

  const closeEntryModal = () => {
    setEntryModalOpen(false);
    setEntryFormSelect('');
    setError(undefined);
  };

  const showError = (err: string): void => setError(err);

  if (!id && typeof id !== 'string')
    return (
      <div>
        <Typography>Provided id is not valid</Typography>
      </div>
    );

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
      <FormControl sx={{ m: 1, minWidth: 155 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Add New Entry
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={entryFormSelect}
          onChange={entryFormSelectChangeHandler}
          autoWidth
          label="Add New Entry"
        >
          {entryTypeArr.map(([key, value]) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Alert severity="error">{error}</Alert>}
      {entryModalOpen && entryFormSelect !== '' && (
        <AddEntryModal
          onClose={closeEntryModal}
          onSubmit={submitNewEntry}
          showError={showError}
          entryType={entryFormSelect}
        />
      )}
      {patient.entries.length !== 0 && <Entries entries={patient.entries} />}
    </>
  );
};
export default SinglePatientPage;
