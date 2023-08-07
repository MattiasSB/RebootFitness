
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

export default function Button({navigateTo, text, style}) {
  return (
    <Link 
      to={navigateTo}    
      className={styles.button}
      style={style}
    >
      {text}
    </Link>
  )
}
