import { SyntheticEvent, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Diagnosis, EntryType, HospitalEntry } from '../../types';
import { parseDate, parseDiagnosisCodes, parseString } from './utils';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  showError: (err: string) => void;
  onSubmit: (entry: Omit<HospitalEntry, 'id'>) => void;
  onCancel: () => void;
}

const AddHospitalForm = ({ showError, onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleSumit = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      onSubmit({
        type: EntryType.Hospital,
        description: parseString(description, 'Description'),
        date: parseDate(date?.toString(), 'Date'),
        specialist: parseString(specialist, 'Specialist'),
        discharge: {
          date: parseDate(date?.toString(), 'Discharge Date'),
          criteria: parseString(dischargeCriteria, 'Discharge Criteria'),
        },
        ...(diagnosisCodes && {
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        }),
      });

      setDescription('');
      setDate(dayjs());
      setSpecialist('');
      setDiagnosisCodes([]);
      setDischargeDate(dayjs());
      setDischargeCriteria('');
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
        onChange={(event): void => setSpecialist(event.target.value)}
        value={specialist}
      />
      <Box sx={{ height: 20 }} />
      <Divider>
        <Chip label="Discharge" />
      </Divider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
          label="Date"
          onChange={(val): void => setDischargeDate(val)}
          value={dischargeDate}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        id="criteria"
        label="Criteria"
        variant="standard"
        onChange={(event): void => setDischargeCriteria(event.target.value)}
        value={dischargeCriteria}
      />
      <Box sx={{ height: 20 }} />
      <Divider>
        <Chip />
        <Chip />
        <Chip />
      </Divider>
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

export default AddHospitalForm;
