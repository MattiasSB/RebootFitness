import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { Add, Minus } from 'iconsax-react';
import { getDatabase, ref, onValue } from "firebase/database";

import styles from './Profile.module.scss'
import Spinner from '../../components/spinner'
import useAuth from '../../hooks/useAuth'
import LayoutAuth from '../../components/layout-auth'
import BannerAuth from '../../components/banner-auth/BannerAuth'


export default function Profile() {
    const navigate = useNavigate()
    const { user, setLoggedin, loggedIn } = useAuth()
    const auth = getAuth()
    const [isPlus, setIsPlus] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })

    const [isEdited, setIsEdited] = useState(false)

    const { name, email } = formData

    const [bookings, setBookings] = useState([]);
      
    useEffect(() => {
        if (user) {
        const db = getDatabase();
        const userBookingsRef = ref(db, user.uid);
    
        // Attach a listener to the reference
        const unsubscribe = onValue(userBookingsRef, (snapshot) => {
            const bookingData = snapshot.val();
            if (bookingData) {
            const bookingsArray = Object.entries(bookingData).map(([bookingKey, bookingInfo]) => ({
                id: bookingKey,
                ...bookingInfo,
            }));
            setBookings(bookingsArray);
            } else {
            setBookings([]);
            }
        });
    
        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
        }
    }, [user]);

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
    const toggleDropdown = () => {
      setIsPlus(!isPlus);
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
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            onClick={handleEdit}
                            className={styles.button}
                        >
                            {isEdited ? 'Save' : 'Update Profile'}
                        </button>
                    </div>
                    <div className={styles.expandable}>
                        <div onClick={toggleDropdown} className={styles.expandableTop}>
                            <h4>Booking History</h4>
                            <div >{isPlus ? 
                            <Add
                            size= {window.innerWidth >= 1040 ? "25" : "20"}
                            color="#000000"/>  : 
                            <Minus
                                size= {window.innerWidth >= 1040 ? "25" : "20"}
                                color="#000000"
                            />}
                        </div>
                        </div>
                        <div className={`${styles.dropdown} ${isPlus ? styles.hidden : ''}`}>
                            <ul>
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <div>
                                            <p><span>Date:</span><br/> {booking.date} </p>
                                            <p><span>Class:</span><br/>  {booking.classType}</p>
                                        </div>
                                        <div>
                                            <p><span>location</span>:<br/>  {booking.location}</p>
                                            <p><span>time:</span><br/>  {booking.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
