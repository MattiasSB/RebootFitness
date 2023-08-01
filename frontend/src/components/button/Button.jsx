
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

export default function Button({navigateTo, text}) {
  return (
    <Link 
      to={navigateTo}    
      className={styles.button}
    >
      {text}
    </Link>
  )
}
