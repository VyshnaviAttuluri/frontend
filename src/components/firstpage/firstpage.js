import React, { useState } from 'react';
import './firstpage.css'
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const response = await fetch('https://niport.onrender.com/searchpage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: searchQuery }),
                });

                const data = await response.json();

                if (data.result) {
                    setResults(data.result);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('An error occurred while searching. Please try again.');
            }
        } else {
            alert("Please enter a search term.");
        }
    };

    const handleLocationFetched = (location) => {
        console.log('User Location:', location);
        // Optionally, send this location to your backend if needed
    };

    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="https://cdn.freebiesupply.com/logos/large/2x/indiac-logo-png-transparent.png" alt="National Information Portal Logo" />
                </div>
                <div className="web-name">National Information Portal</div>
                <div className="nav-buttons">
                    <button onClick={() => navigate('/signin')}>Sign In</button>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                    <button onClick={() => navigate('/send-otp')}>Patient Sign In</button>
                </div>
            </nav>

            {/* Search Section */}
            <div className="search-section">
                <div className="search-container">
                    <div className="search-box">
                        <div className="search-inner">
                            <div className="search-icon">
                      
                            </div>
                            <input
                                type="text"
                                id="search-input"
                                className="search-input"
                                placeholder="Search for hospitals"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={handleSearch} className="search-button">Search</button>
                            <button 
                                className="location-button" 
                                onClick={() => navigate('/nearby-hospitals')}
                            >
                                🌍 Current Location
                            </button>
                        </div>
                    </div>

                    {results.length > 0 && (
                        <div className="results-container">
                            <ul>
                                {results.map((doc, index) => (
                                    <li key={index}>
                                        <div className="information-container">
                                            
                                            
                                            <div className="information-item"><span>Ventilators:</span> {doc.ventilators}</div>
                                            <div className="information-item"><span>Ambulance Services:</span> {doc.ambulanceServices}</div>
                                            <div className="information-item"><span>Consultation Fees:</span> {doc.consultationFees}</div>
                                            <div className="information-item"><span>ICU Charges:</span> {doc.icuCharges}</div>
                                            <div className="information-item"><span>Bed Availability:</span> {doc.bedAvailability}</div>
                                            <div className="information-item"><span>Ventilator Availability:</span> {doc.ventilatorAvailability}</div>
                                            <div className="information-item"><span>Feedback:</span> {doc.feedback}</div>
                                            <div className="information-item"><span>Ratings:</span> {doc.ratings}</div>
                                            <div className="information-item"><span>icuBedAvailability</span> {doc.icuBedAvailability}</div>
                                      
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {results.length === 0 && searchQuery !== '' && (
                        <div className="results-container">
                            <p>No documents found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Current Location Section */}
            <div className="location-section">
                {/* <CurrentLocation onLocationFetched={handleLocationFetched} /> */}
            </div>

            {/* Emergency Section */}
            <div className="emergency-section">
                <button 
                    className="emergency-button"
                    onClick={() => navigate('/emergencypage')}
                >
                    <span role="img" aria-label="emergency-symbol">⚠</span> Emergency
                </button>
                {/* <button 
                    className="booking-button"
                    onClick={() => navigate('/book-appointment')}
                >
                    📅 Book Appointment
                </button> */}
                {/* <button 
                    className="booking-button"
                    onClick={() => navigate('/book-bed')}
                >
                    🛏 Book Bed
                </button> */}
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <h3>About Us</h3>
                    <p>The National Information Portal provides essential health information and services to the public. We aim to promote public health awareness and ensure easy access to health resources.</p>
                    <p>Contact us at: info@nationalhealthportal.gov</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
