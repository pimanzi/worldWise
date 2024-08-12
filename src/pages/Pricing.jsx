// Uses the same styles as Product
import styles from './Product.module.css';
import PageNav from '../components/PageNav';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav></PageNav>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just for free
          </h2>
          <p>
            At WorldWise, we believe that everyone should have the opportunity
            to preserve and reflect on their adventures without any barriers.
            That’s why we offer our service completely free of charge. With
            WorldWise, you can effortlessly document your travels, save notes of
            your memories, and mark every place you’ve visited on an interactive
            map—all at no cost. Whether you’re a casual traveler or an avid
            explorer, WorldWise provides you with the tools to keep your
            memories alive and plan your next journey, all for free. Start using
            WorldWise today and enjoy the freedom to explore and remember your
            adventures without any limitations.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
