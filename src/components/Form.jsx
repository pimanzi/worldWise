// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.css';
import Button from './Button.jsx';
import ButtonBack from './ButtonBack.jsx';
import useUrlLocation from '../hooks/useUrlLocation.js';
import Message from './Message.jsx';
import Spinner from './Spinner.jsx';
import { useCities } from '../contexts/CitiesProvider.jsx';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const Base_Url = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlLocation();
  const [revLoading, setRevLoading] = useState(false);
  const [revError, setRevError] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!lat || !lng) return;
      try {
        setRevLoading(true);
        setRevError('');
        const res = await fetch(`${Base_Url}?latitude=${lat}&longitude=${lng}`);
        const result = await res.json();
        if (!result.countryCode) {
          throw new Error(
            'Seems you clicked to unknown country, consinder to click to a country or a city '
          );
        }

        setCityName(result.cityName || result.locality);
        setCountry(result.countryName);

        setEmoji(convertToEmoji(result.countryCode));
      } catch (err) {
        setRevError(err.message);
      } finally {
        setRevLoading(false);
      }
    }
    fetchData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      position: { lat, lng },
      notes,
    };
    await createCity(newCity);
    navigate('/app/cities');
  }

  if (revError) return <Message message={revError}></Message>;
  if (revLoading) return <Spinner></Spinner>;
  if (!lat || !lng)
    return (
      <Message message="Start by clicking on the city or the country"></Message>
    );
  return (
    <form
      className={`${styles.form} ${isLoading ? styles['form.loading'] : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(Date) => setDate(Date)}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack></ButtonBack>
      </div>
    </form>
  );
}

export default Form;
