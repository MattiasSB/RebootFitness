
import { Link, useLocation } from "react-router-dom"

import styles from './LinkAuth.module.scss'

export default function LinkAuth({navigateTo, text}) {
    const location = useLocation()

  return (
    <>
        <div
            className={styles.link}
        >
            <p>
                {location.pathname === '/sign-in' ? 'Don\'t you have an account?' : 'Do you already have an account? '}
            </p>
            <Link
                to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}
                >
                    {location.pathname === '/sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
        </div>
    </>
  )
}
