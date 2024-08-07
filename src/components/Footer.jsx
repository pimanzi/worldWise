import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {year} by WorldWise Inc.
      </p>
    </footer>
  );
}

export default Footer;
