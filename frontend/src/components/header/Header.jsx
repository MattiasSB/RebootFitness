import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../header/Header.module.scss';
import NavbarLinks from './header-components/NavBarLinks';
import MenuToggle from './header-components/MenuToggle';
import { useState } from 'react';


export default function Header() {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const navRef = useRef()

  let prevScrollpos = window.scrollY;

  const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos - 1) {
          if(window.innerWidth < 1024 ) {
              navRef.current.style.top = "0";
          } else{
            navRef.current.style.top = "0";
          }
      } else {
          if(window.innerWidth < 1024) {
            navRef.current.style.top = "-6rem";
          } else {
            navRef.current.style.top = "-6rem";
          }
        
      }
      prevScrollpos = currentScrollPos;
  }

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

// Function to toggle the menu state
const handleMenuToggle = () => {
  setMenuOpen((prevMenuState) => !prevMenuState);
};

  return (
    <header ref={navRef}>
      <nav className={styles.header}>
        <div className={styles.linkWrapper}>
          <Link 
            className={styles.headerLogo} 
            to='/'
          >
            Reboot
          </Link>
          <MenuToggle 
            isOpen={isMenuOpen} 
            toggleMenu={handleMenuToggle} 
          />
          <NavbarLinks 
            toggleMenu={handleMenuToggle} 
            isOpen={isMenuOpen}
          />
        </div>
      </nav>
    </header>
  )
}

