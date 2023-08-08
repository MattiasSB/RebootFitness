import styles from './Calendar.module.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ClassFilter from '../class-filter/ClassFilter';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import scheduleData from './schedule.json';
import Button from '../../../../components/button';
import { Navigate } from 'react-router-dom';

export default function Calendar() {
  
  const { view } = useParams();
  const [location, setLocationState] = useState();
  const [selected, setSelected] = useState();
  const [selectedClass, setSelectedClass] = useState('Yoga');

  // Function to calculate the start of the current week based on a given date
  const getCurrentWeekStart = (date) => {
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    return startOfWeek;
  }
  
  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentWeekStart(new Date()));
  // Initialize 'currentWeekStart' state using useState and getCurrentWeekStart


  // Function to update the week dates based on a given start date
  const updateWeekDates = (startOfWeek) => {
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  }

    // Functions to calculate the start of the next
  const getNextWeekStart = (date) => {
    const nextWeekStart = new Date(date);
    nextWeekStart.setDate(date.getDate() + 7);

    if (nextWeekStart.getMonth() !== date.getMonth()) {
      nextWeekStart.setMonth(date.getMonth() + 1);

      if (nextWeekStart.getMonth() === 0) {
        nextWeekStart.setFullYear(nextWeekStart.getFullYear() - 1);
      }
    }

    return nextWeekStart
  }

    // Functions to calculate the previous week
  const getPrevWeekStart = (date) => {
    const prevWeekStart = new Date(date);
    prevWeekStart.setDate(date.getDate() - 7);

    if (prevWeekStart.getMonth() !== date.getMonth()) {
      prevWeekStart.setMonth(date.getMonth() - 1);

      if (prevWeekStart.getMonth() === 11) {
        prevWeekStart.setFullYear(prevWeekStart.getFullYear() + 1);
      }
    }

    return prevWeekStart;
  }

  const weekDates = updateWeekDates(currentWeekStart);

  const currentMonth = currentWeekStart.toLocaleString('default', { month: 'long'});
  const currentYear = currentWeekStart.toLocaleString('default', {year: 'numeric' });

  const [data, setData] = useState([]);


  useEffect(() => {
    setData(scheduleData);
    const initialDate = `${new Date().toLocaleString('default', { weekday: 'short' })}, ${new Date().getDate()}, ${currentMonth} ${currentYear}`;
    if(!selected){
      setSelected(initialDate);
      localStorage.setItem('RebootDate', initialDate);
    }
    console.log(selected)
    if(view === 'burnabynorthgate') {
      setLocationState('Burnaby Northgate')
      localStorage.setItem('RebootLocation', location)
    } 
    else if(view === 'downtownrobson') {
      setLocationState('Downtown Robson')
      localStorage.setItem('RebootLocation', location)
    }
    else if(view === 'surreycentral'){
      setLocationState('Surrey Central')
      localStorage.setItem('RebootLocation', location)
    }
    else if(view === 'coquitlamcenter'){
      setLocationState('Coquitlam Center')
      localStorage.setItem('RebootLocation', location)
    }
  },[setLocationState, view, location, selected, currentMonth, currentYear])

  const [isClicked, setIsClicked] = useState('yoga')
  // Functions to handle clicking the 'Left' and 'Right' buttons to navigate weeks
  const handleLeftClick = () => {
    setCurrentWeekStart(getPrevWeekStart(currentWeekStart));
  }
  const handleRightClick = () => {
    setCurrentWeekStart(getNextWeekStart(currentWeekStart))
  }
  // Function to handle clicking on a date, currently logging the date to the console
  const handleDateClick = (date) => {
    setSelected(selected === date ? '' : date); // Toggle the selected date
    console.log(date); // Set the data in state
    localStorage.setItem('RebootDate', date);
  }
  const filteredSchedule = data.filter(item => (
    item.date === selected.substring(0, 3) && item.category === selectedClass
  ));

  const removeNonNumbers = (inputString)=> {
    return inputString.split(':').join('').split(' ').join('');

  }

  const handleActiveChange = (activeItem) => { 
    // Perform asynchronous updates in the parent container
    // You can update the parent state or trigger other actions here
    setSelectedClass(activeItem);
  };
  

  return (
    <section className={`wrapper ${styles.locationClassSelection}`}>
      <h1>{location}</h1>
      <div className={styles.classFilter}>
          <ClassFilter 
              filter={(isClicked) => setIsClicked(isClicked)}
              onActiveChange={handleActiveChange}
          />
      </div>
      <div className={styles.CalendarWrapper}>
        <div onClick={handleLeftClick}>
          <ArrowLeft2 size='2em'/>
        </div>
        <div className={styles.Calendar}>
          <ul>
            {weekDates.map((date, index) => {
              const listItemDate = `${date.toLocaleString('default', { weekday: 'short' })}, ${date.getDate()}, ${currentMonth} ${currentYear}`;
              const isSelected = selected === listItemDate;
  
              return(
              <li
              className={`${styles.CalendarBlock} ${isSelected ? styles.click : styles.default}`}
              onClick={() => handleDateClick(`${date.toLocaleString('default', { weekday: 'short' })}, ${date.getDate()}, ${currentMonth} ${currentYear}`)}
              key={index}
              >
                <p>
                  <span>
                  {` ${currentMonth.substring(0, 3)}`} 
                  </span> 
                  <span>
                    {` ${date.getDate()}`} <br/>
                  </span>
                </p>
                <h3 className={styles.Day}>
                {`${date.toLocaleString('default', { weekday: 'short' })}`}
                </h3>
              </li>
            )})}
          </ul>
        </div>
        <div onClick={handleRightClick}>
          <ArrowRight2 size='2em'/>
        </div>
      </div>
      <div className={styles.scheduleWrapper}>
        <div className={styles.heading}>
          <h4>{selected}</h4>
        </div>
        <ul className={styles.classList}>
        {filteredSchedule.map((item, index) => {          
          return (
          <li key={index}>
            <div className={styles.leftCol}>
              <div>
                <h3>{item.time}</h3>
                <h4>1 Hour</h4>
              </div>
              <div className={styles.profileIcons}></div>
            </div>
            <div className={styles.rightCol}>
              <h4>{`${location} - ${item.category}`}</h4>
                <div 
                onClick={() => {
                  localStorage.setItem('RebootTime', item.time);
                }}>
                  <Button text='Book' navigateTo={removeNonNumbers(`/booking/${location}${item.category}`)}/>
                </div>
            </div>
          </li>
        )})}
        </ul>    
      </div>
    </section>
  )
}
