import { useEffect, useState } from "react";
import axios from 'axios';
import { api } from '../actions/api';

export const Emergencypage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchEmergencyData = async () => {
            try {
                const response = await axios.post("http://localhost:9000/emergencypage")
                if (response.data.result) {
                    console.log(response.data.result);
                    setResults(response.data.result);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
                
                setResults([]);
            }
        };

        fetchEmergencyData()
    }, []);

    return (
        <div className="results-container">
            {results.length > 0 ? (
                <ul>
                    {results.map((doc, index) => (
                        <li key={index} className="result-item">
                            <div className="information-container">
                                <div className="information-item"><span>Hospital Name:</span> {doc.hospitalName}</div>
                                <div className="information-item"><span>ICU Beds:</span> {doc.icuBeds}</div>
                                <div className="information-item"><span>Ventilators:</span> {doc.ventilators}</div>
                                <div className="information-item"><span>Ambulance Services:</span> {doc.ambulanceServices}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No documents found.</p>
            )}
        </div>
    );
};