import styles from './BannerBooking.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function BannerBooking() {
  const navigate = useNavigate();
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
  const handleNavigation = () => {
    // Call the navigate function with the desired route
    navigate(`/booking/${location}`);
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
          <div 
            className={styles.button}
            onClick={handleNavigation}
          >
            Continue
          </div>
        </div>
     </section>
  )
}
