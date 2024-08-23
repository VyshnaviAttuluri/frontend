import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './hform.css';

function Hform() {
    const navigate = useNavigate(); // Initialize the navigate function

    const [hospitalId, setHospitalId] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [hospitalType, setHospitalType] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [accreditation, setAccreditation] = useState('');
    const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
    const [numberOfBeds, setNumberOfBeds] = useState('');
    const [icuBeds, setIcuBeds] = useState('');
    const [ventilators, setVentilators] = useState('');
    const [emergencyServices, setEmergencyServices] = useState('Yes');
    const [ambulanceServices, setAmbulanceServices] = useState('Yes');
    const [consultationFees, setConsultationFees] = useState('');
    const [roomCharges, setRoomCharges] = useState('');
    const [icuCharges, setIcuCharges] = useState('');
    const [surgeryCosts, setSurgeryCosts] = useState('');
    const [diagnosticTestCosts, setDiagnosticTestCosts] = useState('');
    const [emergencyTreatmentCosts, setEmergencyTreatmentCosts] = useState('');
    const [bedAvailability, setBedAvailability] = useState('');
    const [icuBedAvailability, setIcuBedAvailability] = useState('');
    const [ventilatorAvailability, setVentilatorAvailability] = useState('');
    const [covidTreatmentAvailability, setCovidTreatmentAvailability] = useState('Yes');
    const [covidBedAvailability, setCovidBedAvailability] = useState('');
    const [covidIcuBedAvailability, setCovidIcuBedAvailability] = useState('');
    const [covidVentilatorAvailability, setCovidVentilatorAvailability] = useState('');
    const [covidTestAvailability, setCovidTestAvailability] = useState('Yes');
    const [insuranceAccepted, setInsuranceAccepted] = useState('');
    const [discountsConcessions, setDiscountsConcessions] = useState('');
    const [feedbackRatings, setFeedbackRatings] = useState('');
    
    const [specializations, setSpecializations] = useState([
        { name: '', doctors: [''] }
    ]);

    const handleSpecializationChange = (index, event) => {
        const newSpecializations = [...specializations];
        newSpecializations[index].name = event.target.value;
        setSpecializations(newSpecializations);
    };

    const handleDoctorChange = (specIndex, docIndex, event) => {
        const newSpecializations = [...specializations];
        newSpecializations[specIndex].doctors[docIndex] = event.target.value;
        setSpecializations(newSpecializations);
    };

    const addDoctor = (specIndex) => {
        const newSpecializations = [...specializations];
        newSpecializations[specIndex].doctors.push('');
        setSpecializations(newSpecializations);
    };

    const removeDoctor = (specIndex, docIndex) => {
        const newSpecializations = [...specializations];
        newSpecializations[specIndex].doctors = newSpecializations[specIndex].doctors.filter((_, i) => i !== docIndex);
        setSpecializations(newSpecializations);
    };

    const addSpecialization = () => {
        setSpecializations([...specializations, { name: '', doctors: [''] }]);
    };

    const removeSpecialization = (index) => {
        const newSpecializations = specializations.filter((_, i) => i !== index);
        setSpecializations(newSpecializations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            hospitalId,
            hospitalName,
            address,
            contactNumber,
            email,
            website,
            hospitalType,
            licenseNumber,
            accreditation,
            licenseExpiryDate,
            numberOfBeds,
            icuBeds,
            ventilators,
            emergencyServices,
            ambulanceServices,
            consultationFees,
            roomCharges,
            icuCharges,
            surgeryCosts,
            diagnosticTestCosts,
            emergencyTreatmentCosts,
            bedAvailability,
            icuBedAvailability,
            ventilatorAvailability,
            covidTreatmentAvailability,
            covidBedAvailability,
            covidIcuBedAvailability,
            covidVentilatorAvailability,
            covidTestAvailability,
            insuranceAccepted,
            discountsConcessions,
            feedbackRatings,
            specializations
        };

        try {
            const response = await axios.post("https://niport.onrender.com/hlogin", formData);
            if (response.data.success) {
                alert("Signup successful");
                navigate('/'); // Navigate to the home page after successful signup
            } else {
                alert(response.data.message || "Signup failed");
            }
        } catch (err) {
            alert("Error occurred during signup");
        }
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <header>
                <h1>National Health Information Portal</h1>
            </header>
            <main>
                <section id="hospital-form">
                    <h2>Hospital Information Form</h2>
                    <form id="hospitalForm" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Basic Information</legend>
                            <label htmlFor="hospitalId">Hospital ID:</label>
                            <input type="text" id="hospitalId" value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} required />
                            
                            <label htmlFor="hospitalName">Hospital Name:</label>
                            <input type="text" id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />

                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label htmlFor="website">Website:</label>
                            <input type="text" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />

                            <label htmlFor="hospitalType">Hospital Type:</label>
                            <input type="text" id="hospitalType" value={hospitalType} onChange={(e) => setHospitalType(e.target.value)} required />

                            <label htmlFor="licenseNumber">License Number:</label>
                            <input type="text" id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />

                            <label htmlFor="accreditation">Accreditation:</label>
                            <input type="text" id="accreditation" value={accreditation} onChange={(e) => setAccreditation(e.target.value)} />

                            <label htmlFor="licenseExpiryDate">License Expiry Date:</label>
                            <input type="date" id="licenseExpiryDate" value={licenseExpiryDate} onChange={(e) => setLicenseExpiryDate(e.target.value)} required />

                            <label htmlFor="numberOfBeds">Number of Beds:</label>
                            <input type="number" id="numberOfBeds" value={numberOfBeds} onChange={(e) => setNumberOfBeds(e.target.value)} required />

                            <label htmlFor="icuBeds">ICU Beds:</label>
                            <input type="number" id="icuBeds" value={icuBeds} onChange={(e) => setIcuBeds(e.target.value)} />

                            <label htmlFor="ventilators">Ventilators:</label>
                            <input type="number" id="ventilators" value={ventilators} onChange={(e) => setVentilators(e.target.value)} />

                            <label htmlFor="emergencyServices">Emergency Services:</label>
                            <select id="emergencyServices" value={emergencyServices} onChange={(e) => setEmergencyServices(e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <label htmlFor="ambulanceServices">Ambulance Services:</label>
                            <select id="ambulanceServices" value={ambulanceServices} onChange={(e) => setAmbulanceServices(e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <label htmlFor="consultationFees">Consultation Fees:</label>
                            <input type="text" id="consultationFees" value={consultationFees} onChange={(e) => setConsultationFees(e.target.value)} required />

                            <label htmlFor="roomCharges">Room Charges:</label>
                            <input type="text" id="roomCharges" value={roomCharges} onChange={(e) => setRoomCharges(e.target.value)} required />

                            <label htmlFor="icuCharges">ICU Charges:</label>
                            <input type="text" id="icuCharges" value={icuCharges} onChange={(e) => setIcuCharges(e.target.value)} required />

                            <label htmlFor="surgeryCosts">Surgery Costs:</label>
                            <input type="text" id="surgeryCosts" value={surgeryCosts} onChange={(e) => setSurgeryCosts(e.target.value)} required />

                            <label htmlFor="diagnosticTestCosts">Diagnostic Test Costs:</label>
                            <input type="text" id="diagnosticTestCosts" value={diagnosticTestCosts} onChange={(e) => setDiagnosticTestCosts(e.target.value)} required />

                            <label htmlFor="emergencyTreatmentCosts">Emergency Treatment Costs:</label>
                            <input type="text" id="emergencyTreatmentCosts" value={emergencyTreatmentCosts} onChange={(e) => setEmergencyTreatmentCosts(e.target.value)} required />

                            <label htmlFor="bedAvailability">Bed Availability:</label>
                            <input type="text" id="bedAvailability" value={bedAvailability} onChange={(e) => setBedAvailability(e.target.value)} required />

                            <label htmlFor="icuBedAvailability">ICU Bed Availability:</label>
                            <input type="text" id="icuBedAvailability" value={icuBedAvailability} onChange={(e) => setIcuBedAvailability(e.target.value)} required />

                            <label htmlFor="ventilatorAvailability">Ventilator Availability:</label>
                            <input type="text" id="ventilatorAvailability" value={ventilatorAvailability} onChange={(e) => setVentilatorAvailability(e.target.value)} required />

                            <label htmlFor="covidTreatmentAvailability">COVID Treatment Availability:</label>
                            <select id="covidTreatmentAvailability" value={covidTreatmentAvailability} onChange={(e) => setCovidTreatmentAvailability(e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <label htmlFor="covidBedAvailability">COVID Bed Availability:</label>
                            <input type="text" id="covidBedAvailability" value={covidBedAvailability} onChange={(e) => setCovidBedAvailability(e.target.value)} required />

                            <label htmlFor="covidIcuBedAvailability">COVID ICU Bed Availability:</label>
                            <input type="text" id="covidIcuBedAvailability" value={covidIcuBedAvailability} onChange={(e) => setCovidIcuBedAvailability(e.target.value)} required />

                            <label htmlFor="covidVentilatorAvailability">COVID Ventilator Availability:</label>
                            <input type="text" id="covidVentilatorAvailability" value={covidVentilatorAvailability} onChange={(e) => setCovidVentilatorAvailability(e.target.value)} required />

                            <label htmlFor="covidTestAvailability">COVID Test Availability:</label>
                            <select id="covidTestAvailability" value={covidTestAvailability} onChange={(e) => setCovidTestAvailability(e.target.value)}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <label htmlFor="insuranceAccepted">Insurance Accepted:</label>
                            <input type="text" id="insuranceAccepted" value={insuranceAccepted} onChange={(e) => setInsuranceAccepted(e.target.value)} required />

                            <label htmlFor="discountsConcessions">Discounts/Concessions:</label>
                            <input type="text" id="discountsConcessions" value={discountsConcessions} onChange={(e) => setDiscountsConcessions(e.target.value)} />

                            <label htmlFor="feedbackRatings">Feedback Ratings:</label>
                            <input type="text" id="feedbackRatings" value={feedbackRatings} onChange={(e) => setFeedbackRatings(e.target.value)} />
                        </fieldset>

                        <fieldset>
                            <legend>Specializations</legend>
                            {specializations.map((spec, index) => (
                                <div key={index} className="specialization">
                                    <label htmlFor={`specialization${index}`}>Specialization Name:</label>
                                    <input type="text" id={`specialization${index}`} value={spec.name} onChange={(e) => handleSpecializationChange(index, e)} required />
                                    <button type="button" onClick={() => removeSpecialization(index)}>Remove Specialization</button>
                                    <div className="doctors">
                                        {spec.doctors.map((doctor, docIndex) => (
                                            <div key={docIndex} className="doctor">
                                                <label htmlFor={`doctor${index}${docIndex}`}>Doctor's Name:</label>
                                                <input type="text" id={`doctor${index}${docIndex}`} value={doctor} onChange={(e) => handleDoctorChange(index, docIndex, e)} required />
                                                <button type="button" onClick={() => removeDoctor(index, docIndex)}>Remove Doctor</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addDoctor(index)}>Add Doctor</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addSpecialization}>Add Specialization</button>
                        </fieldset>

                        <button type="submit">Submit</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Hform;
