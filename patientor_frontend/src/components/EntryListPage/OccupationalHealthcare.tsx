import { Typography } from "@mui/material"
import { OccupationalHealthcareEntry } from "../../types"

interface Props{
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({entry}:Props)=>{
    return(<>
        <Typography variant="body1"></Typography>
    </>)
}

export default  OccupationalHealthcare;