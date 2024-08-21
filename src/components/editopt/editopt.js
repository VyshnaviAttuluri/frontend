import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editopt.css';
import { useNavigate, useParams } from 'react-router-dom';

function Editopt() {
    const [formData, setFormData] = useState({
        
        hospitalType: '',
       
        icuBeds: '',
        ventilators: '',
        emergencyServices: 'Yes',
        ambulanceServices: 'Yes',
        consultationFees: '',
        roomCharges: '',
        icuCharges: '',
        surgeryCosts: '',
        diagnosticTestCosts: '',
        emergencyTreatmentCosts: '',
        bedAvailability: '',
        icuBedAvailability: '',
        ventilatorAvailability: '',
        covidTreatmentAvailability: 'Yes',
        covidBedAvailability: '',
        covidIcuBedAvailability: '',
        covidVentilatorAvailability: '',
        covidTestAvailability: 'Yes',
        insuranceAccepted: '',
        discountsConcessions: '',
        feedbackRatings: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch existing data for the hospital and set it to the form data
            axios.get(`http://localhost:9000/hospital/${id}`)
                .then(response => {
                    setFormData(response.data);
                    setIsEditing(true);
                })
                .catch(err => {
                    console.error('Error fetching hospital data:', err);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let details;
            if (isEditing) {
                details = await axios.put(`http://localhost:9000/hospital/${id}`, formData);
                if (details.data.success) {
                    alert("Update successful");
                } else {
                    alert(details.data.message || "Update failed");
                }
            } else {
                details = await axios.post("http://localhost:9000/hlogin", formData);
                if (details.data.success) {
                    alert("Signup successful");
                } else {
                    alert(details.data.message || "Signup failed");
                }
            }
            console.log('Form data submitted:', formData);
            navigate('/hospitals');
        } catch (err) {
            alert("Error occurred during form submission");
        }
    };

    return (
        <div>
            <header>
                <h1>National Health Information Portal</h1>
            </header>
            <main>
                <section id="hospital-form">
                    <h2>{isEditing ? 'Edit Hospital Information' : 'Hospital Information Form'}</h2>
                    <form id="hospitalForm" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Hospital Information</legend>
                            <label htmlFor="hospitalId">Hospital ID:</label>
                            <input type="text" id="hospitalId" name="hospitalId" value={formData.hospitalId} onChange={handleChange} required disabled={isEditing} />
                            
                            <label htmlFor="hospitalName">Hospital Name:</label>
                            <input type="text" id="hospitalName" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required />
                            
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                            
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                            
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            
                            <label htmlFor="website">Website:</label>
                            <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
                            
                            <label htmlFor="hospitalType">Hospital Type:</label>
                            <input type="text" id="hospitalType" name="hospitalType" value={formData.hospitalType} onChange={handleChange} required />
                        </fieldset>
                        
                        {/* Add other fieldsets similar to above, using the formData and handleChange for values and onChange */}
                        
                        <button type="submit" className="submit-btn">
                            {isEditing ? 'Update Information' : 'Submit'}
                        </button>
                    </form>
                </section>
            </main>
            <footer>
                <p>© 2024 National Health Information Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Editopt;
