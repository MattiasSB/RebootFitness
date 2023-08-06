import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../header/Header.module.scss';
import { User } from 'iconsax-react';
import useAuth from '../../../hooks/useAuth';


export default function NavbarLinks({ isOpen, toggleMenu }) {
    const location = useLocation()
    const { loggedIn } = useAuth()
    const navbarLinksStyle = {
        top: isOpen ? '4em' : '-100vh',  // Move it up 100vh + 1rem when open, otherwise position it below the header
    }

    console.log( location.pathname)
  return (
    <ul  style={navbarLinksStyle} className={styles.linkWrapper}>
        <li>
            <Link 
                onClick={toggleMenu} 
                to='/about'
                className={ location.pathname === '/about' ? styles.active : null}
            >About
            </Link>
        </li>
        <li>
            <Link 
                onClick={toggleMenu} 
                to='/classes'
                className={ location.pathname === '/classes' ? styles.active : null}
            >Classes
            </Link>
        </li>
        <li>
            <Link 
                onClick={toggleMenu} 
                to='/membership'
                className={ location.pathname === '/membership' ? styles.active : null}
            >Membership
            </Link>
        </li>
        <li>
            <Link 
                onClick={toggleMenu} 
                to='/booking'
                className={ location.pathname === '/booking' ? styles.active : null}
            >Booking
            </Link>
        </li>
        <li>
            <div>
                { loggedIn ?
                <Link 
                onClick={toggleMenu} 
                className={styles.loginSignUpContainer} 
                to='/profile'
                >
                    <User 
                        size="16" 
                        className={styles.loginIcon}
                    />
                    <span 
                    className={ location.pathname === '/profile' ? styles.active : null}>Profile</span>
                </Link> :
                <Link 
                onClick={toggleMenu} 
                className={styles.loginSignUpContainer} 
                to='/sign-in'
                >
                    <User 
                        size="16" 
                        className={styles.loginIcon}
                    />
                    <span
                    className={ 
                        location.pathname === '/sign-in' || 
                        location.pathname === '/sign-up' ? 
                        styles.active : 
                        null
                    }
                    >Login/SignUp</span>
                 </Link>
                }
           
            </div>
        </li>
    </ul>
  )
}

NavbarLinks.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  };
