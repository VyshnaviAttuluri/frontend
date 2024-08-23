import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './resetpas.css';

export const Resetpas = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const nav = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email || !newPassword) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post("https://niport.onrender.com/reset-password", { email, newPassword });
            if (response.data.success) {
                alert("Password updated successfully");
                nav('/signin');
            } else {
                alert(response.data.message || "User not found or password not updated");
            }
        } catch (err) {
            console.error("Error updating password:", err);
            alert("An error occurred while updating the password");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />
                </div>
                <div>
                    <label htmlFor="new-password">New Password</label>
                    <input
                        type="password"
                        id="new-password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                </div>
                <button type="submit">
                    Reset Password
                </button>
            </form>
            <div>
                Remembered your password?{' '}
                <span onClick={() => nav('/signin')}>
                    Sign In
                </span>
            </div>
        </div>
    );
};