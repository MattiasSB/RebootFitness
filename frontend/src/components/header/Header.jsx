import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../header/Header.module.scss';
import NavbarLinks from './header-components/NavBarLinks';
import MenuToggle from './header-components/MenuToggle';
import { useState } from 'react';





export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state
  const handleMenuToggle = () => {
    setMenuOpen((prevMenuState) => !prevMenuState);
  };

  return (
    <header>
      <nav className={styles.header}>
        <div className={styles.linkWrapper}>
          <Link 
            className={styles.headerLogo} 
            to='/'
          >
            Reboot
          </Link>
          <MenuToggle isOpen={isMenuOpen} toggleMenu={handleMenuToggle} />
          <NavbarLinks isOpen={isMenuOpen} />
        </div>
      </nav>
    </header>
  )
}

