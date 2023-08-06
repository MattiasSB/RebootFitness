import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { MoreCircle, Add } from 'iconsax-react'

import styles from './Profile.module.scss'
import useAuth from '../../hooks/useAuth'
import LayoutAuth from '../../components/layout-auth'
import BannerAuth from '../../components/banner-auth/BannerAuth'

export default function Profile() {
    const navigate = useNavigate()
    const { user, setLoggedin } = useAuth()
    const auth = getAuth()

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const [isEdited, setIsEdited] = useState(false)

    const { name, email } = formData

    const onSignOut = async () => {
        await auth.signOut()
        setLoggedin(false)
        navigate('/')
    }

    const handleEdit = (e) => {
        e.preventDefault()
        setIsEdited((prev) => !prev)
        isEdited && onSubmit()
    }

    const onSubmit = async () => {

        try {
            if(auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })

                const userRef = doc(db, 'users', auth.currentUser.uid )
                await updateDoc(userRef, {
                    name,
                })
            }
        } catch(error) {
            console.log('Could not update profile details')
        }
    }

    const onUpdate = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }))
    }

  return (
    <>
        <section>
            <BannerAuth />
            <LayoutAuth 
               user={user.displayName}    
            >
                <form className={styles.account}>
                    <label htmlFor="name">
                        name
                    </label>
                    <input 
                        type="text" 
                        id='name'
                        value={name}
                        className={isEdited ? styles.edited : null}
                        onChange={onUpdate}
                        disabled={!isEdited}
                    />
                    <div className={styles.emailAndPhoneNumber}>
                        <label htmlFor="email">
                            email
                        </label>
                        <input 
                            type="text" 
                            id='email'
                            value={email}
                            onChange={onUpdate}
                            disabled
                        />
                        <label htmlFor="email">
                            phone number
                        </label>
                        <input 
                            type="text" 
                            id='phoneNumber'
                            value={email}
                            className={isEdited ? styles.edited : null}
                            onChange={onUpdate}
                            disabled={!isEdited}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            onClick={handleEdit}
                            className={styles.button}
                        >
                            {isEdited ? 'Save' : 'Update Profile'}
                        </button>
                    </div>
                    <div className={styles.bookingHistory}>
                        <h3>booking history</h3>
                        <Add
                            size="17"
                            color="#000000"
                        />
                        {/* booking history */}
                    </div>
                </form>
                <button
                    onClick={onSignOut}
                    className={styles.button}
                >
                    Sign out
                </button>
            </LayoutAuth>
        </section>
    </>
  )
}
