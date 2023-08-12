import { Typography } from "@mui/material"
import { HospitalEntry } from "../../types";

interface Props {
    entry:HospitalEntry;
}

const Hospital = ({entry}:Props) => {
    return (<>
        <Typography variant='body1'></Typography>
    </>)
}

export default Hospital;