import styles from '../../header/Header.module.scss';
import { Link } from 'react-router-dom';
import {User} from 'iconsax-react';

export default function LoginSignUp() {
  return (
    <div>
      <Link className={styles.loginSignUpContainer} to='/sign-in'>
        <User size="16" className={styles.loginIcon}/>
        <span>Login/SignUp</span>
      </Link>
    </div>
  )
}
