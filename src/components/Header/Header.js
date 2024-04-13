import React from 'react';
import Clock from '../Clock/Clock';
import LogIn from '../../pages/LogIn/LogIn';
import MoodStatistics from '../../pages/MoodStatistics/MoodStatistics';
import './Header.css';

export function Header() {
    return (
        <div className='header-container'>
            <MoodStatistics />
            {/* <Clock /> */}
        </div>
    )
}

export default Header;