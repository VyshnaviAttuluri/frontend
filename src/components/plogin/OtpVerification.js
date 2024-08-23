import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();  // Initialize the navigation hook

    const sendOtp = async () => {
        try {
            const response = await axios.post('https://niport.onrender.com/send-otp', { email });
            if (response.data) {
                setIsOtpSent(true);
                setError('');
                alert('OTP sent successfully')
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            console.log("Email:", email);
            console.log("OTP:", otp);

            const response = await axios.post('http://localhost:9000/verify-otp', {
                email,
                otp,
            });

            if (response.data.success) {
                setIsVerified(true);
                console.log('OTP verified successfully:', response.data.message);

                // Navigate to the booking form upon successful verification
                navigate('/bookingform');
            } else {
                console.error('OTP verification failed:', response.data.message);
                setError('Invalid or expired OTP.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data?.message || error.message);
            setError('An error occurred while verifying OTP. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h2>OTP Verification</h2>

            {!isOtpSent && !isVerified && (
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        required
                    />
                    <button onClick={sendOtp} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Send OTP
                    </button>
                </div>
            )}

            {isOtpSent && !isVerified && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        required
                    />
                    <button onClick={verifyOtp} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Verify OTP
                    </button>
                </div>
            )}

            {isVerified && <h3>OTP Verified Successfully!</h3>}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default OtpVerification;
