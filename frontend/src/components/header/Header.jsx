import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../header/Header.module.scss';
import NavbarLinks from './header-components/NavBarLinks';
import MenuToggle from './header-components/MenuToggle';
import { useState } from 'react';

export default function Header() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHeaderSolid, setHeaderSolid] = useState(false);

  const navRef = useRef()



  useEffect(() => {
    let prevScrollpos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos - 1) {
          if(window.innerWidth > 1024 ) {
              navRef.current.style.top = "0";
          } 
      } 
      else {
          if(window.innerWidth > 1024) {
              // ** i just left this as it is since 6rem is just for positioning i didn't think it matters with the header height also I changed the height of header to 5.125rem
            navRef.current.style.top = "-6rem";
          } else {
            navRef.current.style.top = "0";
          }
      }

      prevScrollpos = currentScrollPos;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

// Function to toggle the menu state
const handleMenuToggle = () => {
  setMenuOpen((prevMenuState) => {
    if (!prevMenuState) {
      if (window.innerWidth < 768){
        // Add the class to disable scrolling when the menu is opened
        document.body.style.overflow = "hidden";
        setHeaderSolid(true); 
        // Set header background to solid black when menu is opened
      
      }
      
    } else {
      // Remove the class to enable scrolling when the menu is closed
      document.body.style.overflow = "initial"
      setHeaderSolid(false); 
      // Set header background to default state when menu is closed
    }
    return !prevMenuState;
  });

};

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768){
      setMenuOpen(false);
      // Remove the class to enable scrolling when the menu is closed
      document.body.style.overflow = "initial"
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const handleHome = () => {
  setMenuOpen(false);
  // Remove the class to enable scrolling when the menu is closed
  setHeaderSolid(false)
  document.body.style.overflow = "initial"
}

  return (
    <header 
      style={{ backgroundColor: isHeaderSolid ? 'black' : 'rgba(0, 0, 0, 0.648)' }} 
      ref={navRef}
    >
      <nav className={styles.header}>
        <div className={styles.linkWrapper}>
          <Link 
            onClick={handleHome}
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

