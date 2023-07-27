import { Link } from 'react-router-dom';
import LoginSignUp from './LoginLink';
import styles from '../../header/Header.module.scss';


export default function NavbarLinks({ isOpen }) {
    const navbarLinksStyle = {
        top: isOpen ? '4em' : '-100vh',  // Move it up 100vh + 1rem when open, otherwise position it below the header
        transition: 'top 0.3s ease-in-out', // Add the transition effect
    }
  return (
    <ul  style={navbarLinksStyle} className={styles.linkWrapper}>
        <li>
            <Link to='/about'>About</Link>
        </li>
        <li>
            <Link to='/classes'>Classes</Link>
        </li>
        <li>
            <Link to='/membership'>Membership</Link>
        </li>
        <li>
            <Link to='/booking'>Booking</Link>
        </li>
        <li>
            <LoginSignUp />
        </li>
    </ul>
  )
}
