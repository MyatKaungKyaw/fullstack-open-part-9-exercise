import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Diagnosis, Entry, EntryType } from '../../types';

import diagnosesService from '../../services/diagnoses';
import { useEffect, useState } from 'react';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';

const descriptionStyle = {
  root: {
    fontFamily: 'Roboto Condensed, sans-serif',
    fontStyle: 'italic',
  },
};

interface Props {
  entries: Entry[];
}

const Entries = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService.getAll().then((d) => {
      setDiagnoses(d);
    });
  }, []);

  const getDiagnose = (code: string): string => {
    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
    return diagnose != null ? diagnose.name : '';
  };

  const ExtendEntry = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.HealthCheck:
        return <HealthCheck entry={entry} />
      case EntryType.OccupationalHealthCare:
        return <OccupationalHealthcare entry={entry} />
      case EntryType.Hospital:
        return <Hospital entry={entry} />
      default:
        const _exhaustiveCheck: never = entry;
        return _exhaustiveCheck;
    }
  }

  return (
    <>
      <Typography variant="h5">Entries</Typography>
      <List>
        {entries.map((entry) => (
          <div key={entry.id}>
            <ListItem key={entry.id} component={Paper}>
              <ListItemText>
                <Typography variant="body1">
                  {entry.date}
                </Typography>
                <Typography
                  variant="body1"
                  style={descriptionStyle.root}
                >
                  {' ' + entry.description}
                </Typography>
                {
                  ExtendEntry(entry)
                }
                <Typography variant="body1">diagnose by {entry.specialist}</Typography>
                {entry?.diagnosisCodes && (
                  <List>
                    {entry.diagnosisCodes.map((code) => (
                      <ListItem key={code}>
                        <ListItemIcon>
                          <CircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                          {code}
                          {' ' + getDiagnose(code)}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                )}
              </ListItemText>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
};

export default Entries;
