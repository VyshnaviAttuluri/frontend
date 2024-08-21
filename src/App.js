import './App.css';
import SignupForm from './components/signup1/signup1';
import { Signin } from './components/signin/signin';
import { Resetpas } from './components/resetpas/resetpas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/firstpage/firstpage';
import Hform from './components/hform/hform';
import { Emergencypage } from './components/emergency/emergency';

// Import new components
import BedBooking from './components/bookingform/bookingform';
import AppointmentBooking from './components/appoinmentbooking.js/appointmentbooking';
import NearbyHospitals from './components/NearbyHospitals/NearbyHospitals';
import BookingForm from './components/bookingform/bookingform';
import OtpVerification from './components/plogin/OtpVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/resetpas" element={<Resetpas />} />
        <Route path="/hospital-form" element={<Hform />} />
        <Route path="/emergencypage" element={<Emergencypage />} />
        <Route path='/bookingform' element={<BookingForm/>}/>
        <Route path='/send-otp' element={<OtpVerification/>}/>
        
        {/* New routes */}
        <Route path="/book-bed" element={<BedBooking hospitalId="hospital_id_placeholder" />} />
        <Route path="/book-appointment" element={<AppointmentBooking hospitalId="hospital_id_placeholder" />} />
        <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
