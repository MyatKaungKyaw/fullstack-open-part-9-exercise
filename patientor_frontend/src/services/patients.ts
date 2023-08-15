import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientWithId = async(id:string)=> {
  const patient =(await axios.get<Patient>( `${apiBaseUrl}/patients/${id}`)).data;
  return patient;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntries = async (patientId:string, entry: NewEntry) => {
  const newEntry = (await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`,entry)).data;
  return newEntry;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientWithId, createEntries,
};

