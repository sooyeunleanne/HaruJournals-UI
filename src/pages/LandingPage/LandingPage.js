import React, { useCallback, useState } from 'react';
import './LandingPage.css';

import LogInComponent from '../../components/LogInComponent/LogInComponent';
import SignUpComponent from '../../components/SignUpComponent/SignUpComponent';

import landingPage from '../../assets/landing page.png';
import logo from '../../assets/logo.png'

function LandingPage({onLogin}) {
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
        <div className='landing-page'>
            {openLogIn && <LogInComponent onCloseClick={onCloseLogInClick} onLogin={onLogin}/>}
            {openSignUp && <SignUpComponent onCloseClick={onCloseSignUpClick} />}

            <div className='open-screen'>
                <img className='logo-display' src={logo} />
                <h1 className='heading'>J O U R N A L</h1>
                <br/>
                <button className='open-button' onClick={onLogInClick}>Log-in</button>
                <br/>
                <button className='open-button' onClick={onSignUpClick}>Sign-up</button>
            </div>
            
        </div>
    );
}

export default LandingPage;
