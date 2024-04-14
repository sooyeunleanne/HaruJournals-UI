import React, { useCallback, useState } from 'react';
import './LogIn.css';

import openscreen from '../../assets/openscreen.png';

function LogIn() {
    const [openLogIn, setOpenLogIn] = useState(false);

    const onLogInClick = useCallback(() => {
        setOpenLogIn(true);
        setOpenSignUp(false);
    }, []);

    const onCloseLogInClick = useCallback(() => {
        setOpenLogIn(false);
    }, []);

    const [openSignUp, setOpenSignUp] = useState(false);

    const onSignUpClick = useCallback(() => {
        setOpenSignUp(true);
        setOpenLogIn(false);
    }, []);

    const onCloseSignUpClick = useCallback(() => {
        setOpenSignUp(false);
    }, []);

    return (
        <div>
            <div className='button-container'>
                <button className='open-button' onClick={onLogInClick}>Log-in</button>
                <button className='open-button' onClick={onSignUpClick}>Sign up</button>
            </div>

            {openLogIn && <LogInComponent onCloseClick={onCloseLogInClick} onSignUpClick={onSignUpClick}/>}
            {openSignUp && <SignUpComponent onCloseClick={onCloseSignUpClick} onLogInClick={onLogInClick}/>}

            <div className='open-screen'>
                <h1>Welcome to everyday journals!</h1>
                <img style={{width: '80%', height: 'auto'}} src={openscreen}></img>
            </div>
            
        </div>
    );
}

function LogInComponent({ onCloseClick, onSignUpClick }) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <h1>Log-in</h1>
            <p>Username</p>
            <textarea className='login-textarea'></textarea>
            <p>Password</p>
            <textarea className='login-textarea'></textarea>
            <button className='connect-to-button' onClick={onSignUpClick}>Sign up</button>            
        </div>
    );
}

function SignUpComponent( {onCloseClick, onLogInClick} ) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <h1>Sign-up</h1>
            <p>Username</p>
            <textarea className='login-textarea'></textarea>
            <p>Password</p>
            <textarea className='login-textarea'></textarea>

            <button className='connect-to-button' onClick={onLogInClick}>Log-in</button>            
        </div>
    )
}
export default LogIn;
