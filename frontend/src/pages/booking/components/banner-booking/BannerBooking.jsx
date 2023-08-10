import styles from './BannerBooking.module.scss'
import { useState } from 'react';
import Button from '../../../../components/button';


export default function BannerBooking() {
  //sets the book page as the route
  const getInitialState = () => {
    const value = 'book';
    return value;
  };

  //gets the initial state which sets the route to the current page as a default
  const [value, setValue] = useState(getInitialState);
  const [location, setLocation] = useState(getInitialState);
  //handle event with the value passed in as a parameter
  const handleChange = (e) => {
    //value state and location are made = to the value of the selection
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
          { /*value's are equal to the route of the next page*/}
          <select value={value} onChange={handleChange}>
            <option value='book'>Select a location</option>
            <option value='burnabynorthgate'>Burnaby Northgate</option>
            <option value='downtownrobson'>Downtown Robson</option>
            <option value='surreycentral'>Surrey Central</option>
            <option value='coquitlamcenter'>Coquitlam Center</option>
          </select>
          { /*Navigates to the booking page with the location concatenated as the URL*/}
          <Button navigateTo={`/booking/${location}`} text='confirm' />
        </div>
     </section>
  )
}
