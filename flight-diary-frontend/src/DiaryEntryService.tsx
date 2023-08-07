import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001';

export const getAllDiayEntries = async (): Promise<
  NonSensitiveDiaryEntry[]
> => {
  return (await axios.get<DiaryEntry[]>(`${baseUrl}/api/diaries`)).data;
};

export const createDiaryEntry = async (
  newDiaryEntry: NewDiaryEntry
): Promise<DiaryEntry> => {
  return (await axios.post<DiaryEntry>(`${baseUrl}/api/diaries`, newDiaryEntry))
    .data;
};
