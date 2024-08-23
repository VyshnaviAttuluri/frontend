// src/components/adminsignin/AdminSignin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminsignin.css'; // Create a CSS file for styles

const AdminSignin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminSignIn = async () => {
        try {
            const res = await axios.post("https://niport.onrender.com/admin-signin", { username, password });
            if (res.data.message) {
                alert("Admin login successful");
                // Navigate to admin dashboard or home
                navigate('/'); // Redirect after successful login
            } else {
                alert(res.data.error || "Admin not found");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="admin-signin-container">
            <h2>Admin Sign In</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={handleAdminSignIn}>Sign In</button>
        </div>
    );
};

export default AdminSignin;
