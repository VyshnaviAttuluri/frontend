import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [bedType, setBedType] = useState('normal'); // Default to normal ward
    const [hospitalOptions, setHospitalOptions] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get("http://localhost:9000/hospitals"); // Adjust endpoint as needed
                setHospitalOptions(response.data.hospitals);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the data being sent to the backend
        console.log('Submitting booking with data:', {
            hospitalName,
            patientName,
            bedType,
        });

        try {
            const response = await axios.post("http://localhost:9000/book", {
                hospitalName,  // Send hospitalName instead of hospitalId
                patientName,
                bedType
            });

            if (response.data.success) {
                setMessage('Booking successful');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error during booking:', error.response || error.message);
            setMessage('An error occurred during booking');
        }
    };

    return (
        <div>
            <h2>Book a Bed</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient Name:</label>
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hospital:</label>
                    <select
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a hospital</option>
                        {hospitalOptions.map((hospital) => (
                            <option key={hospital._id} value={hospital.hospitalName}>
                                {hospital.hospitalName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Bed Type:</label>
                    <select
                        value={bedType}
                        onChange={(e) => setBedType(e.target.value)}
                        required
                    >
                        <option value="normal">Normal Ward</option>
                        <option value="icu">ICU</option>
                    </select>
                </div>
                <button type="submit">Book Bed</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookingForm;
