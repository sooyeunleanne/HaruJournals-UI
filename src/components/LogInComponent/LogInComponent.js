import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function LogInComponent({ onCloseClick, onSignUpClick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/login', { username, password });

            // Check the response for success
            if (response.status === 200) {
                setMessage(response.data.message);
                // Here you can redirect the user or save the token/user data
                navigate('/calendar');
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Error fetching data');
        }
    };

    return (
        <div className='popup-container'>
            <div className="login-container">
                <button className='close-button' onClick={onCloseClick}> X </button>
                <h1>Log-in</h1>
                {message && <p className="error-message">{message}</p>}
                <p>Username</p>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='login-textarea'
                    required
                />
                <p>Password</p>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='login-textarea'
                    required
                />
                <button className='connect-to-button' onClick={() => window.location.href = 'http://localhost:8000/auth/google'}>
                    Login with Google
                </button>
                <button className='connect-to-button' onClick={handleLogin}>Log In</button>
                <button className='connect-to-button' onClick={onSignUpClick}>Sign Up</button>       
            </div>     
        </div>
    );
}
