import { Link, NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo.jsx';

function Navbar() {
  return (
    <nav className={styles.nav}>
      {' '}
      <Link to="/">
        <Logo></Logo>
      </Link>
      <ul>
        <li>
          <NavLink to="/pricing">Price</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            {' '}
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
