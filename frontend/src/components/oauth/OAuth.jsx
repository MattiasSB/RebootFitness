import { useLocation } from 'react-router-dom'

import styles from './OAuth.module.scss'
import googleLogo from '../../assets/icons/googleLogo.svg'
export default function OAuth() {
    const location = useLocation()

    const onGoogleClick = () => {
        console.log('google')
    }
    
 return(
    <button
        className={styles.button}
        onClick={onGoogleClick}
    >
        <img 
            src={googleLogo}
            alt="Google Logo" 
        />
        <p>
            Sign {location.pathname === '/sign-in' ? 'in' : 'up'} with Google
        </p>
    </button>
 )

}

