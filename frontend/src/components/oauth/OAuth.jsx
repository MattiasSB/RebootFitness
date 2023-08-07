import { useLocation, useNavigate } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'

import styles from './OAuth.module.scss'
import { db } from '../../firebase.config'
import googleLogo from '../../assets/icons/googleLogo.svg'

export default function OAuth() {
    const location = useLocation()
    const navigate = useNavigate()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

                // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            
                // If user doesn't exist, create user
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch(error) {
            console.log(error)
        }
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

