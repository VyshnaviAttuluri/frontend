// src/components/location/CurrentLocation.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const CurrentLocation = ({ onLocationFetched }) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    const mapStyles = {
        height: "50vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 0,
        lng: 0
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const currentLocation = { lat: latitude, lng: longitude };
                    setLocation(currentLocation);
                    onLocationFetched(currentLocation);
                },
                () => {
                    setError('Unable to retrieve your location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, [onLocationFetched]);

    return (
        <div>
            {error && <p>{error}</p>}
            {location && (
                <LoadScript googleMapsApiKey="YOUR_API_KEY">
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
                        center={location}
                    >
                        <Marker position={location} />
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
};

export default CurrentLocation;
