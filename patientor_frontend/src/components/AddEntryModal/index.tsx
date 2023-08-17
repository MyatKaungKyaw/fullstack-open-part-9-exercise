import { Box, Typography } from '@mui/material';
import { NewEntry } from '../../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';

interface Props {
  showError: (err: string) => void;
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
}

const AddEntryModal = ({ showError, onSubmit, onClose }: Props) => {
  return (
    <>
      <Box sx={{ border: '3px dotted' }} marginBottom="1em">
        <Typography variant="h6">New Health Check Entry</Typography>
        <AddHealthCheckEntryForm
          onCancel={onClose}
          onSubmit={onSubmit}
          showError={showError}
        />
      </Box>
    </>
  );
};

export default AddEntryModal;
