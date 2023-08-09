import { Typography } from '@mui/material';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import { Gender, Patient } from '../../types';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import patientService from '../../services/patients';

// interface Props {
//   patient: Patient;
// }

interface LoaderArgs extends Omit<LoaderFunctionArgs, 'params'> {
  params: {
    id: string;
  };
}

export const loader = ({ params }: LoaderArgs) => {
  const patient = patientService.getPatientWithId(params.id);
  return patient;
};

const SinglePatientPage = () => {
  //   const { id } = useParams();
  //   if (!id && typeof id !== 'string')
  //     return (
  //       <div>
  //         <Typography>Provided id is not valid</Typography>
  //       </div>
  //     );
  //   let patient: Patient | undefined;
  //   patientService.getPatientWithId(id).then((p) => {
  //     patient = p;
  //   });

  //   if (typeof patient === 'undefined')
  //     return (
  //       <div>
  //         <Typography>Loading Patient data ...</Typography>
  //       </div>
  //     );

  const patient = useLoaderData() as Patient;

  return (
    <div>
      {/* <Typography variant="h1">Patientor</Typography>
      <Button variant="contained">HOME</Button> */}
      <Typography variant="h2">
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
    </div>
  );
};

export default SinglePatientPage;
