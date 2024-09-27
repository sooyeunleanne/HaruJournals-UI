import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpComponent( {onCloseClick, onLogInClick} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users', { username, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'An error occurred');
        }
    };

    return (
        <form>
            <div className='popup-container'>
                <button className='close-button' onClick={onCloseClick}> X </button>
                <h1>Sign-up</h1>
                <p>Username</p>
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='login-textarea'
                required></input>
                <p>Password</p>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='login-textarea'
                required></input>

                <button className='connect-to-button' onClick={handleSignup}>Sign Up</button>            
            </div>
        </form>
        
    )
}