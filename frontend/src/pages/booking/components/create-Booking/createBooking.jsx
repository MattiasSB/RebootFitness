import styles from './createBooking.module.scss'
import { Link } from 'react-router-dom'
export default function CreateBooking() {
    const bookingClassType = localStorage.getItem('RebootClassType');
    const bookingClassTime = localStorage.getItem('RebootClassType');
    const bookingDate = localStorage.getItem('RebootClassType');

  return (
    <section className={`wrapper ${styles.BookingDetails}`}>
      <div className={styles.bookingWrapper}>
          <div className={styles.header}>
            <h2>Booking Details</h2>
          </div>
          <h1>{}</h1>
          <div></div>
          <div>
            <div></div>
          </div>
      </div>
      <Link to={'/booking/book'}></Link>
    </section>
  )
}
