
import { useLocation } from 'react-router-dom'

import styles from './ButtonAuth.module.scss'

export default function ButtonAuth() {
  const location = useLocation()

  return (
    <button
      type="submit"  
      className={styles.button}
    >
      <p>Sign {location.pathname === '/sign-in' ? 'in' : 'up' }</p>
    </button>
  )
}
