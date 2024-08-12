import styles from './Product.module.css';
import PageNav from '../components/PageNav';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav></PageNav>
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            WorldWise is your ultimate tool for documenting and reflecting on
            your adventures around the globe. Whether you're exploring bustling
            cities or serene landscapes, WorldWise lets you mark each location
            on an interactive map, creating a personalized travel log. At every
            stop, you can save notes that capture the memories and experiences
            that made your journey special. With a focus on simplicity and
            meaningful reflection, WorldWise is designed for travelers who
            cherish the stories behind their trips. Keep your adventures
            organized, relive your experiences, and plan your next journey with
            WorldWise.
          </p>
        </div>
      </section>
    </main>
  );
}
