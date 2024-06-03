import React from 'react';
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