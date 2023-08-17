import { SyntheticEvent, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  Diagnosis,
  EntryType,
  HealthCheckEntry,
  HealthCheckRating,
} from '../../types';
import {
  parseDate,
  parseDiagnosisCodes,
  parseHealthCheckRating,
} from './utils';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  showError: (err: string) => void;
  onSubmit: (entry: Omit<HealthCheckEntry, 'id'>) => void;
  onCancel: () => void;
}

const AddHealthCheckEntryForm = ({ showError, onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating|''>('');

  const handleSumit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      onSubmit({
        type: EntryType.HealthCheck,
        description,
        date: parseDate(date?.toString(), 'date'),
        specialist,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        ...(diagnosisCodes && {
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        }),
      });

      setDescription('');
      setDate(dayjs());
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheckRating('');
    } catch (e: unknown) {
      let message = 'something went wrong';
      if (e instanceof Error) {
        message = e.message;
      }
      showError(message);
    }
  };

  const onDiagnosisCodesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiagnosisCodes(
      event.target.value
        .trim()
        .split(',')
        .map((val) => val.trim())
    );
  };

  const HCRMenuItems = () => {
    const items = [];
    for (const key in HealthCheckRating) {
      if (isNaN(Number(key)) && HealthCheckRating.hasOwnProperty(key)) {
        items.push(
          <MenuItem key={key} value={HealthCheckRating[key]}>
            {key}
          </MenuItem>
        );
      }
    }
    return items;
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
          label="Date"
          onChange={(val) => {
            setDate(val);
          }}
          value={date}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        id="specialist"
        label="Specialist"
        variant="standard"
        onChange={(event) => setSpecialist(event.target.value)}
        value={specialist}
      />
      <FormControl variant="standard" fullWidth>
        <InputLabel id="healthCheckRatingLabel">Health Check Rating</InputLabel>
        <Select
          labelId="healthCheckRatingLabel"
          id="healthCheckRating"
          value={healthCheckRating}
          onChange={(event): void =>
            setHealthCheckRating(Number(event.target.value))
          }
          label="Health Check Rating"
        >
          {HCRMenuItems()}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="diagnosisCodes"
        label="Diagnosis Code"
        variant="standard"
        onChange={onDiagnosisCodesChange}
        value={diagnosisCodes.join(', ')}
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
