import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { Add } from 'iconsax-react'

import styles from './Profile.module.scss'
import Spinner from '../../components/spinner'
import useAuth from '../../hooks/useAuth'
import LayoutAuth from '../../components/layout-auth'
import BannerAuth from '../../components/banner-auth/BannerAuth'

export default function Profile() {
    const navigate = useNavigate()
    const { user, setLoggedin, loggedIn } = useAuth()
    const auth = getAuth()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })

    const [isEdited, setIsEdited] = useState(false)

    const { name, email } = formData

    useEffect(() => {
        if (loggedIn && user) {
            setFormData({
                name: user.displayName,
                email: user.email,
            });
        }
    }, [user, loggedIn]);

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
            if(user.displayName !== name) {
                await updateProfile(user, {
                    displayName: name,
                })

                const userRef = doc(db, 'users', user.uid )
                await updateDoc(userRef, {
                    name,
                })

                setFormData((prev) => ({
                    ...prev,
                    name,
                }));
                
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
  if (!loggedIn) {
    return  <Spinner />
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
                        {/* <label htmlFor="email">
                            phone number
                        </label>
                        <input 
                            type="text" 
                            id='phoneNumber'
                            value={email}
                            className={isEdited ? styles.edited : null}
                            onChange={onUpdate}
                            disabled={!isEdited}
                        /> */}
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
