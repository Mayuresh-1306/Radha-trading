import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// The path must go up one level (..) to find the 'context' folder
import AuthContext from '../context/AuthContext'; 

const LoginForm = () => {
    // Get the login handler from the AuthContext
    const { login } = useContext(AuthContext); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Sends data to your backend's POST /login route
            const response = await axios.post('http://localhost:3002/login', formData);
            
            const token = response.data.token;
            login(token); // Store the token and update global login state
            
            navigate('/'); // Redirect to the main dashboard/home page
            
        } catch (err) {
            console.error('Login error:', err.response);
            const msg = err.response?.data?.error || 'Login failed. Check email/password or server connection.';
            setError(msg);
        }
    };

    return (
        <div className="auth-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                
                {/* Form fields */}
                <div className="form-group"><label htmlFor="email">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                <div className="form-group"><label htmlFor="password">Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} required /></div>
                
                {error && <p className="error-message error">{error}</p>}
                
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default LoginForm;