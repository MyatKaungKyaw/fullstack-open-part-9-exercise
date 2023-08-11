import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () : Promise<Diagnosis[]>=> {
    const diagnoses = (await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)).data;
    return diagnoses;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
};