import styles from './CountryList.module.css';
import Spinner from './Spinner.jsx';
import CountryItem from './CountryItem.jsx';
import Message from './Message.jsx';
import { useCities } from '../contexts/CitiesProvider.jsx';
function CountryList() {
  const { isLoading, cities } = useCities();
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  if (isLoading) return <Spinner></Spinner>;
  if (!cities.length)
    return (
      <Message message="Add your first Country by clicking a Country on a Map"></Message>
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((Country) => (
        <CountryItem country={Country} key={Country.emoji}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
