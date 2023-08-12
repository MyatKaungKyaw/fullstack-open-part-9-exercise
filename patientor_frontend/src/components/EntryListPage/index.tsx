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
import { Diagnosis, Entry } from '../../types';

import diagnosesService from '../../services/diagnoses';
import { useEffect, useState } from 'react';

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

  return (
    <>
      <Typography variant="h3">Entries</Typography>
      <List>
        {entries.map((entry) => (
          <>
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
          </>
        ))}
      </List>
    </>
  );
};

export default Entries;
