import styles from './BannerBooking.module.scss'
import { useState } from 'react';
import Button from '../../../../components/button';


export default function BannerBooking() {
  const getInitialState = () => {
    const value = 'book';
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [location, setLocation] = useState(getInitialState);
  const handleChange = (e) => {
    setValue(e.target.value);
      setLocation(e.target.value);
  };

  return (
    <section className={styles.banner}>
        <div className={styles.heading}>
          <h4>Booking</h4>
          <h1>
          Select Studio
          </h1>
          <select value={value} onChange={handleChange}>
            <option value='book'>Select a location</option>
            <option value='burnabynorthgate'>Burnaby Northgate</option>
            <option value='downtownrobson'>Downtown Robson</option>
            <option value='surreycentral'>Surrey Central</option>
            <option value='coquitlamcenter'>Coquitlam Center</option>
          </select>
          <Button navigateTo={`/booking/${location}`} text='confirm' />
        </div>
     </section>
  )
}
