import styles from './createBooking.module.scss'
import { Link } from 'react-router-dom'
import Button from '../../../../components/button/Button'
import { useState, useEffect } from 'react';
import { description, Address } from '../../../../data/booking';
import useAuth from '../../../../hooks/useAuth';
import { getAuth } from 'firebase/auth'
import { database } from '../../../../firebase.config'
import { set, ref } from 'firebase/database'

export default function CreateBooking() {
    const bookingClassType = localStorage.getItem('RebootClassType');
    const bookingClassTime = localStorage.getItem('RebootTime');
    const bookingDate = localStorage.getItem('RebootDate');
    const bookingClassLocation = localStorage.getItem('RebootLocation');

    const { loggedIn } = useAuth()
    const auth = getAuth()

    const [validated, setValidated] = useState();
    const [click, setClick] = useState();

    const formatMonthDayString = (input) => {
      const segments = (input || '').split(',').map(segment => segment.trim());
      if (segments.length >= 3) {
        const [, day, monthYear] = segments;
        const [month] = monthYear.split(' ');
        return `${month.substring(0, 3)} ${day}`;
      }
      return '';
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    });

    const formatDayString = (input) => {
      const segments = (input || '').split(',').map(segment => segment.trim());
      return segments[0] || '';
    };

    const [isPlus, setIsPlus] = useState(true);
    const toggleDropdown = () => {
      setIsPlus(!isPlus);
    }

    const selectedDescription = description.find(desc => desc.class === bookingClassType);

    const selectedAddress = Address.find(desc => desc.name === bookingClassLocation);

    useEffect(() => {
      if (validated === true && !loggedIn){
        window.location.href = '/booking/failureLoginSignup';
      } 
      else if(validated === true && loggedIn){
        localStorage.setItem('RebootBooking', `${bookingClassLocation}, ${bookingClassType}, ${bookingDate}, ${bookingClassTime}`);
      }
      else if(validated === false){
        window.location.href = '/booking/failure';
      }
    })

    const handleBooking = () => {
  
      const valuesToCheck = [
        bookingClassLocation, bookingClassTime, bookingClassType, bookingDate
      ]

      let allValid = true;

      valuesToCheck.forEach((value) => {
        if (value === '' || value === null || value === undefined) {
          console.log(`${value} is empty, null, or undefined.`);
          allValid = false;
          return
        }
      });

      if (allValid === true) {
        console.log('success');
        setValidated(true); // Set the validated state to true here if needed
        window.location.href = '/booking/success';
      } else {
        setValidated(false);

      }
      
    } 
    if(user && click){
      set(ref(database, `/${bookingDate}/${user.uid}`), {
        location: `${bookingClassLocation}`,
        classType: `${bookingClassType}`,
        date: `${bookingDate}`,
        time: `${bookingClassTime}`
      })
    }
    if(user){
      set(ref(database, `/${bookingDate}/${user.uid}`), {
        location: `${bookingClassLocation}`,
        classType: `${bookingClassType}`,
        date: `${bookingDate}`,
        time: `${bookingClassTime}`
      })
    }
  return (
    <section className={`wrapper ${styles.BookingDetails}`}>
      <div className={styles.bookingWrapper}>
          <div className={styles.heading}>
            <h2>Booking Details</h2>
          </div>
          <div className={styles.Date}>
            <h1>
              {formatMonthDayString(bookingDate)} 
              <br/>
              <span className={styles.dayTrip}> 
                {formatDayString(bookingDate)}
              </span>
            </h1>
          </div>
          <div className={styles.profileIcon}></div>
          <div className={styles.classInfo}>
            <h3>{bookingClassType}</h3>
            <h4>{bookingClassTime}</h4>
            <h4>{bookingClassLocation}</h4>
          </div>
          <div className={styles.expandable}>
            <div className={styles.expandableTop}>
              <h4>Description & Details</h4>
              <div onClick={toggleDropdown}>{isPlus ? '+' : '-'}</div>
            </div>
            <div className={`${styles.dropdown} ${isPlus ? styles.hidden : ''}`}>
              <p>
                {selectedDescription ? selectedDescription.description : 'No description available.'}
              </p>
              <p>
                {selectedAddress ? selectedAddress.street : 'No Address Available'}
              </p>
              <p>
                {selectedAddress ? selectedAddress.cityPostalCode : 'No Postal Code Available'}
              </p>
              <p>
                {selectedAddress ? selectedAddress.country : 'No Country Available'}
              </p>
              <p>
                {selectedAddress ? selectedAddress.email : 'No Email Available'}
              </p>
            </div>
          </div>
          <div 
            className={styles.Button}
            onClick={handleBooking}
          >
            <Button text='Book' />
          </div>
      </div>
      <div className={styles.backLink}>
        <Link to={'#'} onClick={() => window.history.back()}>&lt; Back</Link>
      </div>
    </section>
  )
}
