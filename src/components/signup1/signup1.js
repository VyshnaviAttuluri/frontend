import axios from 'axios';
import React, { useState } from 'react';
import './signup1.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const details = await axios.post("http://localhost:9000/signup", { email, password });
        if (details.data.success) {
          alert("Signup successful");
          nav('/signin');
        } else {
          alert(details.data.message || "Signup failed");
        }
      } catch (err) {
        alert("Error occurred during signup");
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;