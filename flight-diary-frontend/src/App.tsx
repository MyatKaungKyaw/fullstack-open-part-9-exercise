import React, { useEffect, useState } from 'react';
import { DiaryEntryProps, NonSensitiveDiaryEntry, DiaryFormProps } from './types';
import { getAllDiayEntries } from './DiaryEntryService';
import toNewDiaryEntry from './utils';

const Diary = ({ diaryEntry }: DiaryEntryProps) => {
  return (<li>
    <h3>{diaryEntry.date}</h3>
    <p>visibility: {diaryEntry.visibility}</p>
    <p>weather: {diaryEntry.weather}</p>
  </li>)
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.diaryEntrySubmit(toNewDiaryEntry({
      date,weather,visibility,comment
    }));
  }
  return (<>
    <h1>Add new entry</h1>
    <form onSubmit={submit}>
      <label htmlFor='date'>date</label>
      <input id='date' value={date} onChange={event => setDate(event.target.value)} />
      <label htmlFor='weather'>weather</label>
      <input id='weather' value={weather} onChange={event => setWeather(event.target.value)} />
      <label htmlFor='visibility'>visibility</label>
      <input id='visibility' value={visibility} onChange={event => setVisibility(event.target.value)} />
      <label htmlFor='comment'>comment</label>
      <input id='comment' value={comment} onChange={event => setComment(event.target.value)} />
      <button type='submit'>add</button>
    </form>
  </>)
}

function App() {
  const [DiaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiayEntries().then(data => { setDiaryEntries(data) })
  }, []);
  

  return (
    <>
      <h1>Diary entries</h1>
      <ul>
        {DiaryEntries.map(diaryEntry => <Diary diaryEntry={diaryEntry} />)}
      </ul>
    </>
  )
}

export default App;