import React, { useState } from 'react';
import axios from 'axios';

const AppointmentBooking = ({ hospitalId }) => {
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');

    const handleBookAppointment = async () => {
        try {
            const response = await axios.post('http://localhost:9000/book-appointment', {
                hospitalId,
                userId: 'user_id_placeholder', // Replace with actual user ID
                doctorName,
                appointmentDate,
                appointmentTime
            });

            if (response.data.success) {
                setMessage('Appointment booked successfully!');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setMessage('An error occurred while booking the appointment.');
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <input
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
            />
            <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
            />
            <button onClick={handleBookAppointment}>Book Appointment</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AppointmentBooking;
