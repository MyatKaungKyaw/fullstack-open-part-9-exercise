import { Box, Typography } from '@mui/material';

import { EntryType, NewEntry } from '../../types';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalHealthcareForm from './AddOccupationalHealthCareForm';

interface Props {
  showError: (err: string) => void;
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
  entryType: EntryType;
}

const EntryForm = ({ showError, onSubmit, onClose, entryType }: Props) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <AddHealthCheckForm
          onCancel={onClose}
          onSubmit={onSubmit}
          showError={showError}
        />
      );
    case EntryType.Hospital:
      return (
        <AddHospitalForm
          onCancel={onClose}
          onSubmit={onSubmit}
          showError={showError}
        />
      );
    case EntryType.OccupationalHealthCare:
      return (
        <AddOccupationalHealthcareForm
          onCancel={onClose}
          onSubmit={onSubmit}
          showError={showError}
        />
      );
    default:
      exhaustiveCheck(entryType);
  }
};

function exhaustiveCheck(param: never): never {
  throw new Error('should not reach here');
}

const AddEntryModal = (props: Props) => {
  return (
    <>
      <Box sx={{ border: '3px dotted' }} marginBottom="1em">
        <Typography variant="h6">New Health Check Entry</Typography>
        {EntryForm(props)}
      </Box>
    </>
  );
};

export default AddEntryModal;
