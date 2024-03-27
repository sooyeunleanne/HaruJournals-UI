import React from 'react';
import Clock from '../Clock/Clock';
import LogIn from '../../pages/LogIn/LogIn';

function Header() {
    return (
        <div className='header-container'>
            <Clock />
            <LogIn />
        </div>
    )
}

export default Header;