import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DiaryEntryProps,
  NonSensitiveDiaryEntry,
  DiaryFormProps,
  NewDiaryEntry,
} from './types';
import { getAllDiayEntries, createDiaryEntry } from './DiaryEntryService';
import toNewDiaryEntry from './utils';

const Diary = ({ diaryEntry }: DiaryEntryProps) => {
  return (
    <li>
      <h3>{diaryEntry.date}</h3>
      <p>visibility: {diaryEntry.visibility}</p>
      <p>weather: {diaryEntry.weather}</p>
    </li>
  );
};

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      props.diaryEntrySubmit(
        toNewDiaryEntry({
          date,
          weather,
          visibility,
          comment,
        })
      );
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    } catch (error: unknown) {
      props.showError(errorHandler(error));
    }
  };

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input
            id="weather"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input
            id="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

const errorHandler = (error: unknown): string => {
  let errorMessage;
  if (axios.isAxiosError(error)) {
    errorMessage = `Status: ${error.status} \n
        Error: ${error.response}`;
  } else {
    errorMessage =
      error instanceof Error ? `Error: ${error.message}` : 'unknown error';
  }
  return errorMessage;
};

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    getAllDiayEntries()
      .then((data) => {
        setDiaryEntries(data);
      })
      .catch((error: unknown) => {
        showError(errorHandler(error));
      });
  }, []);

  const diaryEntrySubmit = (newDiaryEntry: NewDiaryEntry) => {
    createDiaryEntry(newDiaryEntry)
      .then((diaryEntry) => setDiaryEntries(diaryEntries.concat(diaryEntry)))
      .catch((error) => {
        showError(errorHandler(error));
      });
  };

  const showError = (error: string) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(undefined);
    }, 5000);
  };

  const errorStyle = {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
  };

  return (
    <>
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
      <DiaryForm diaryEntrySubmit={diaryEntrySubmit} showError={showError} />
      <h1 key="diary entries">Diary entries</h1>
      <ul>
        {diaryEntries.map((diaryEntry) => (
          <Diary key={diaryEntry.id} diaryEntry={diaryEntry} />
        ))}
      </ul>
    </>
  );
}

export default App;
