import { Typography } from "@mui/material"
import { HospitalEntry } from "../../types";

interface Props {
    entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {
    return (<>
        <Typography variant='h6'>Discharge</Typography>
        <Typography variant='body1'>date: {entry.discharge.date}</Typography>
        <Typography variant='body1'>criteria: {entry.discharge.criteria}</Typography>
    </>)
}

export default Hospital;