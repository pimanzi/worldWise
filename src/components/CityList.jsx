import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import CityItem from './CityItem.jsx';
import Message from './Message.jsx';
import { useCities } from '../contexts/CitiesProvider.jsx';
function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner></Spinner>;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on a Map"></Message>
    );
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}></CityItem>
      ))}
    </div>
  );
}

export default CityList;
