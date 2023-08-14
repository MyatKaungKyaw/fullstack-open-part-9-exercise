import { HealthCheckEntry, HealthCheckRating } from "../../types"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepOrange, yellow } from "@mui/material/colors";

interface Props {
    entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
    const HCRValues: number[] = Object.values(HealthCheckRating).map(h => Number(h)).filter(h => !isNaN(h));
    const maxHCR = Math.max(...HCRValues);
    const minHCR = Math.min(...HCRValues);
    const midHCR = (maxHCR-minHCR)/2;

    const HCRcolor = (hcr: HealthCheckRating)=>{
        if(hcr===minHCR){
            return {color: yellow[500]}
        }else if(hcr < midHCR){
            return {color:yellow[800]}
        }else if(hcr === midHCR){
            return {color:deepOrange[500]}
        }else{
            return {color:deepOrange[800]}
        }
    }
    
    return (<>
        <FavoriteIcon sx={HCRcolor(entry.healthCheckRating)}/>
    </>)
}

export default HealthCheck;