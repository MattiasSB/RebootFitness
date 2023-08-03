import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../header/Header.module.scss';
import { User } from 'iconsax-react';


export default function NavbarLinks({ isOpen, toggleMenu }) {
    const navbarLinksStyle = {
        top: isOpen ? '4em' : '-100vh',  // Move it up 100vh + 1rem when open, otherwise position it below the header
    }
  return (
    <ul  style={navbarLinksStyle} className={styles.linkWrapper}>
        <li>
            <Link onClick={toggleMenu} to='/about'>About</Link>
        </li>
        <li>
            <Link onClick={toggleMenu} to='/classes'>Classes</Link>
        </li>
        <li>
            <Link onClick={toggleMenu} to='/membership'>Membership</Link>
        </li>
        <li>
            <Link onClick={toggleMenu} to='/booking'>Booking</Link>
        </li>
        <li>
            <div>
                <Link 
                    onClick={toggleMenu} 
                    className={styles.loginSignUpContainer} 
                    to='/sign-in'
                >
                    <User size="16" className={styles.loginIcon}/>
                    <span>Login/SignUp</span>
                </Link>
            </div>
        </li>
    </ul>
  )
}

NavbarLinks.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  };
