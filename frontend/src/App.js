import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import './App.scss';
import Home from './pages/home'
import Header from './components/header/Header';
import Footer from './components/footer';
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import ForgotPassword from './pages/forgotPassword';
import About from './pages/about'
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
        <Route path='/about' element={<About />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />}/>
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
