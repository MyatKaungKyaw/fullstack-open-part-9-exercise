import { Typography } from "@mui/material"
import { OccupationalHealthcareEntry } from "../../types"

interface Props {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: Props) => {
    return (<>
        <Typography variant="body1">employerName: {entry.employerName}</Typography>
        {entry?.sickLeave && <><Typography variant="h4">Sick Leave</Typography>
            <Typography variant="body1">startDate: {entry.sickLeave.startDate}</Typography>
            <Typography variant="body1">endDate: {entry.sickLeave.endDate}</Typography>
        </>}
    </>)
}

export default OccupationalHealthcare;