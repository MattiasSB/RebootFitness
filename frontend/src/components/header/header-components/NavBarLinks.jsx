import { Link } from 'react-router-dom';
import LoginSignUp from './LoginLink';
import styles from '../../header/Header.module.scss';


export default function NavbarLinks() {
  return (
    <ul className={styles.linkWrapper}>
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
