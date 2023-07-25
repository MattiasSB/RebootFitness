import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss';
import Home from './pages/home'
import Header from './components/header/Header';
import Footer from './components/footer';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import About from './pages/about';
import Classes from './pages/classes';
import Membership from './pages/membership';
import Booking from './pages/booking';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;