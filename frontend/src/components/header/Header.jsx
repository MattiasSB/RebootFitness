import { Link } from 'react-router-dom';
import styles from '../header/Header.module.scss';
import NavbarLinks from './header-components/NavBarLinks';



export default function Header() {
  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.linkWrapper}>
          <Link className={styles.headerLogo} to='/'>Reboot</Link>
          <NavbarLinks />
        </div>
      </nav>
    </header>
  )
}

