import Sidebar from '../components/Sidebar';
import styles from './AppLayout.module.css';
import Map from '../components/Map';
import User from '../components/User';
function Homepage() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
      <User></User>
    </div>
  );
}

export default Homepage;
