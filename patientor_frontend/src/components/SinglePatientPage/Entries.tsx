import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Entry } from '../../types';

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
  return (
    <>
      <Typography variant="h3">Entries</Typography>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Typography variant="body1" display="inline">
            {entry.date}
          </Typography>
          <Typography
            variant="body1"
            style={descriptionStyle.root}
            display="inline"
          >
            {' ' + entry.description}
          </Typography>
          {entry?.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemIcon>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText>{code}</ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
    </>
  );
};

export default Entries;
