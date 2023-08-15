import { SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { Diagnosis, EntryType, HealthCheckRating, NewEntry } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [codes, setCodes] = useState<Array<Diagnosis['code']>>([]);

  useEffect(() => {
    diagnosesService.getAll().then((d) => {
      const codes = d.map((d) => d.code);
      setCodes(codes);
    });
  }, []);

  const handleSumit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryType.HealthCheck,
      description,
      date,
      specialist,
      healthCheckRating,
      ...(diagnosisCodes && diagnosisCodes),
    });
  };

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const onHealthCheckRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHealthCheckRating(Number(event.target.value));
  };

  const onDiagnosisCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiagnosisCodes(
      event.target.value
        .trim()
        .split(',')
        .map((val) => val.trim())
    );
  };

  return (
    <form onSubmit={handleSumit}>
      <TextField
        fullWidth
        id="description"
        label="Description"
        variant="standard"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <TextField
        fullWidth
        id="date"
        label="Date"
        variant="standard"
        onChange={onDateChange}
        value={date}
      />
      <TextField
        fullWidth
        id="specialist"
        label="Specialist"
        variant="standard"
        onChange={(event) => setSpecialist(event.target.value)}
        value={specialist}
      />
      <TextField
        fullWidth
        id="healthCheckRating"
        label="Health Check Rating"
        variant="standard"
        onChange={onHealthCheckRatingChange}
        value={healthCheckRating}
      />
      <TextField
        fullWidth
        id="diagnosisCodes"
        label="Diagnosis Code"
        variant="standard"
        onChange={onDiagnosisCodesChange}
        value={() => diagnosisCodes.join(', ')}
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="error"
          style={{ float: 'left' }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ float: 'right' }}
          type="submit"
        >
          ADD
        </Button>
      </Box>
    </form>
  );
};

export default AddHealthCheckEntryForm;
