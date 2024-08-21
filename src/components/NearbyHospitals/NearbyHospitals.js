import React, { useState } from 'react';
import axios from 'axios';

const NearbyHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('');

    const handleFindNearbyHospitals = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await axios.post('http://localhost:9000/nearby-hospitals', {
                        latitude,
                        longitude,
                        radius: 10 // Radius in miles
                    });

                    if (response.data.success) {
                        setHospitals(response.data.hospitals);
                    } else {
                        setMessage(response.data.message);
                    }
                } catch (error) {
                    console.error('Error finding nearby hospitals:', error);
                    setMessage('An error occurred while searching for hospitals.');
                }
            }, (error) => {
                setMessage('Failed to get current location.');
                console.error('Error getting location:', error);
            });
        } else {
            setMessage('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <h2>Nearby Hospitals</h2>
            <button onClick={handleFindNearbyHospitals}>Find Nearby Hospitals</button>
            {message && <p>{message}</p>}
            {hospitals.length > 0 && (
                <ul>
                    {hospitals.map((hospital, index) => (
                        <li key={index}>
                            <p>Hospital Name: {hospital.name}</p>
                            <p>Available ICU Beds: {hospital.icuBeds}</p>
                            <p>Available Ventilators: {hospital.ventilators}</p>
                            {/* Add more hospital details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NearbyHospitals;
