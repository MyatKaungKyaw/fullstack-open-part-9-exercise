import { Typography } from "@mui/material"
import { HealthCheckEntry } from "../../types"

interface Props {
    entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
    return (<>
        <Typography variant='body1'>health check rating: {entry.healthCheckRating}</Typography>
    </>)
}

export default HealthCheck;