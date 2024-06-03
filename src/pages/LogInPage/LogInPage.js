import React, { useCallback, useState } from 'react';
import './LogInPage.css';

import LogInComponent from '../../components/LogInComponent/LogInComponent';
import SignUpComponent from '../../components/SignUpComponent/SignUpComponent';

import openscreen from '../../assets/openscreen.png';

function LogInPage() {
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
                <h1>Welcome to Everyday Journals</h1>
                <img style={{width: '80%', height: 'auto'}} src={openscreen}></img>
            </div>
            
        </div>
    );
}

export default LogInPage;
