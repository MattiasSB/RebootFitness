
import { useLocation } from 'react-router-dom'

import styles from './LayoutAuth.module.scss'
import OAuth from '../oauth'
import LinkAuth from '../link-auth'

export default function LayoutAuth({children, user}) {
    const location = useLocation()
    const isSignIn = location.pathname === '/sign-in'
    const isProfile = location.pathname === '/profile'
  return (
    <>
        <div className={`wrapper ${styles.container}`}>
          <div className={styles.heading}>
            { isProfile ? 
              <h1>Hello, <br />{user}</h1>
             : (
              <>
                <h1>Welcome {isSignIn ? 'Back' : 'Aboard'}</h1>
                <p>
                {isSignIn ? 
                'Let\'s sweat, inspire, and achieve greatness together.' : 
                'Start your fitness journey at Reboot and let us guide you to your best self!' }
                </p>
              </>
             )
            }
          </div>
          <div className={styles.formContainer}>
            { isProfile ? 
            <>
              <h2>Account Details</h2>
              {children}
            </> :
            <>
              <h2>Sign {isSignIn ? 'in' : 'up'}</h2>
                {children}
              <div
              className={styles.divider}  
              >
                <span>or</span>
              </div>
              <OAuth />
              <LinkAuth />
              {isSignIn ? null :
                <p className={styles.termsOfUse}>
                    By creating an account and signing up on our platform, you acknowledge and agree to the <span>Reboot terms of use:</span>
                </p>
              }
            </>}

          </div>
        </div>
    </>
  )
}
