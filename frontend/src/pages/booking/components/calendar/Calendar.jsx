import styles from './Calendar.module.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ClassFilter from '../class-filter/ClassFilter';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import scheduleData from './schedule.json';
import Button from '../../../../components/button';


export default function Calendar() {
  
  //defines the view paramter of the URL which should be equal to the chosen location
  const { view } = useParams();
  //state variables for the location of the selected gym as well as the user selected calendar date
  const [location, setLocationState] = useState();
  const [selected, setSelected] = useState();
  //sets the default list to be loaded as the Yoga class
  const [selectedClass, setSelectedClass] = useState('Yoga');

  // Function to calculate the start of the current week based on a given date
  const getCurrentWeekStart = (date) => {
    //date.getDay() retrieves the day of the week from (0 - 6)(Sunday = 0, Saturday = 6 )
    const dayOfWeek = date.getDay();
    //This essentially makes a copy of the date object to be affected without changing the actual date (allows for calculations with the date object)
    const startOfWeek = new Date(date);
    //This line sets the date of the startOfWeek object to the day of the week's start (Sunday) by subtracting the dayOfWeek value from the current date of the input date.
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    //Returns the day the week starts on
    return startOfWeek;
  }
  
  //state variable to store the current weeks start
  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentWeekStart(new Date()));

  // Function to update the week dates based on a given start date
  const updateWeekDates = (startOfWeek) => {
    const weekDates = [];
    //weekdates is an empty array

    //for each of the 7 days
    for (let i = 0; i < 7; i++) {
      //startOfWeek.getFullYear(): Gets the year of the startOfWeek date.
      //startOfWeek.getMonth(): Gets the month of the startOfWeek date (0-indexed, where January is 0 and December is 11).  startOfWeek.getDate() + i: Gets the day of the month of the startOfWeek date and adds i days to it.
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      //pushes the new date segments to the empty array
      weekDates.push(date);
    }
    //returns the array
    return weekDates;
  }

  // Functions to calculate the start of the next week
  const getNextWeekStart = (date) => {
    //creates a new date object with the passed in parameter 
    const nextWeekStart = new Date(date);
    //adds 7 to the current week start and sets value to variable
    nextWeekStart.setDate(date.getDate() + 7);
    //checks to see if the next week is aa different month then the current date
    if (nextWeekStart.getMonth() !== date.getMonth()) {
      //if it's a different month add 1 month
      nextWeekStart.setMonth(date.getMonth() + 1);
      //if it's a different year (if next month is january(code = 0)) and decrements by 1 to ensure the date stays at correct for the year
      if (nextWeekStart.getMonth() === 0) {
        nextWeekStart.setFullYear(nextWeekStart.getFullYear() - 1);
      }
    }
    //returns the next week's date object
    return nextWeekStart
  }

    // Functions to calculate the previous week with date passed in as a parameter
    const getPrevWeekStart = (date) => {
    //creates a new date object with passed in date parameter
    const prevWeekStart = new Date(date);
    //subtracts 7 from the weeks start date
    prevWeekStart.setDate(date.getDate() - 7);
    //If the week extends into the previous month
    if (prevWeekStart.getMonth() !== date.getMonth()) {
      //subtract a month/decrement the month code by 1
      prevWeekStart.setMonth(date.getMonth() - 1);
      //if it is about to be the previous year
      if (prevWeekStart.getMonth() === 11) {
        //offset days by 1 to ensure correct dates
        prevWeekStart.setFullYear(prevWeekStart.getFullYear() + 1);
      }
    }
    //return the previous week
    return prevWeekStart;
  }
  //creates a const with an array of this weeks dates (totalling 7 days)
  const weekDates = updateWeekDates(currentWeekStart);

  //sets currentMonth to the long format of this month
  const currentMonth = currentWeekStart.toLocaleString('default', { month: 'long'});
  //sets currentYear to the default numeric format of the year
  const currentYear = currentWeekStart.toLocaleString('default', {year: 'numeric' });

  //sets the json data as a empty array
  const [data, setData] = useState([]);


  //UseEffect array monitors variables and updates asynchronous
  useEffect(() => {
    //sets the data to the JSON dataset
    setData(scheduleData);
    //sets the inital date to a formatted date string
    const initialDate = `${new Date().toLocaleString('default', { weekday: 'short' })}, ${new Date().getDate()}, ${currentMonth} ${currentYear}`;
    //if no date is selected
    if(!selected){
      //set the selected date to today
      setSelected(initialDate);
      //save the date to local storage
      localStorage.setItem('RebootDate', initialDate);
    }
    //if the page is = to route specified set the location in local storage to the formatted route parameter 
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
    //monitors a dependency array
  },[setLocationState, view, location, selected, currentMonth, currentYear])

  const [, setIsClicked] = useState('yoga')
  // Functions to handle clicking the 'Left' and 'Right' buttons to navigate weeks
  const handleLeftClick = () => {
    //changes week start date to the prior week
    setCurrentWeekStart(getPrevWeekStart(currentWeekStart));
  }
  const handleRightClick = () => {
    //changes week start date to the next week
    setCurrentWeekStart(getNextWeekStart(currentWeekStart))
  }
  // Function to handle clicking on a date, currently logging the date to the console
  const handleDateClick = (date) => {
    //if a date is selected then set the selected variable to the date
    setSelected(selected === date ? '' : date); 
    //save the date to localStorage
    localStorage.setItem('RebootDate', date);
  }
  //filter creates new array with conditionally added dates
  const filteredSchedule = data.filter(item => (
    //checks to see if the date is 3 letters and if the category is the same as the selectedClass state variable
    item.date === selected.substring(0, 3) && item.category === selectedClass
  ));

  //removes non numbers from a string inputted as a parameter
  const removeNonNumbers = (inputString)=> {
    //removes any : or ' ' that appear in the string (splits them into other strings and joins them into one string)
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
              //listItemDate is a formatted date set to the value of the selected date
              const listItemDate = `${date.toLocaleString('default', { weekday: 'short' })}, ${date.getDate()}, ${currentMonth} ${currentYear}`;
              //checks to see if selected is the same as one of the list item dates so it can conditionally render classes
              const isSelected = selected === listItemDate;
              return(
              <li
              className={`${styles.CalendarBlock} ${isSelected ? styles.click : styles.default}`}
              onClick={() => handleDateClick(`${date.toLocaleString('default', { weekday: 'short' })}, ${date.getDate()}, ${currentMonth} ${currentYear}`)}
              key={index}
              >
                {/* onclick handles date change with the passed in parameter */}
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
                  }}
                >
                  <Button 
                    text='Book' 
                    navigateTo={
                      removeNonNumbers(
                        `/booking/${location}${item.category}`
                      )
                    }
                  />
                </div>
            </div>
          </li>
        )})}
        </ul>    
      </div>
    </section>
  )
}
