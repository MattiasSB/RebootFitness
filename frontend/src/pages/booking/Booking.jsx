import Banner from './components/banner/Banner'
import Intro from './components/intro/Intro'
import { useParams } from 'react-router-dom';
import BannerBooking from './components/banner-booking/BannerBooking'
import Calendar from './components/calendar/Calendar';


export default function Booking() {
  const { view } = useParams();
  return ( 
    <main>
      {view === undefined && <Banner />}
      {view === 'book' && <BannerBooking />}
      {view === undefined && <Intro />}
      {view === 'burnabynorthgate' && <Calendar />}
      {view === 'downtownrobson' && <Calendar />}
      {view === 'surreycentral' && <Calendar />}
      {view === 'coquitlamcenter' && <Calendar />}
    </main>
  )
}
