import {React, useCallback, useState} from "react";
import {useNavigate} from 'react-router-dom';
import './Header.css';

import profile from '../../assets/profile-placeholder.png';

export default function Header( {onDarkModeChange, onLogout} ) {
    const [openSettings, setOpenSettings] = useState(false);
    const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    const onProfileIconClick = useCallback(() => {
        setOpenSettings(prevState => !prevState);
    });

    const onAppearanceClick = useCallback(() => {
        setShowAppearanceOptions(prevState => !prevState);
    }, []);

    const onDarkModeToggle = useCallback(() => {
        setDarkMode(prevState => {
            const newDarkMode = !prevState;
            onDarkModeChange(newDarkMode); // Notify parent component
            return newDarkMode;
        });
    }, [onDarkModeChange]);

    const handleLogout = () => {
        navigate('/'); // Navigate to login page after logout
    };

    return (
        <div className='header-container'>
            <img onClick={onProfileIconClick} className='profile-img-small' src={profile}/>
            {openSettings && 
            <div className='setting-container'>
                <div className='option' onClick={onAppearanceClick}>Appearance</div>
                {showAppearanceOptions && 
                    <div>
                        <span className='toggle-label'>Dark Mode</span>
                        <label className='toggle-switch'>
                        <input type='checkbox' checked={darkMode} onChange={onDarkModeToggle} />
                        <span className='slider round'></span>
                        </label>
                    </div>
                }
                <div className='option' onClick={handleLogout}>Logout</div>
            </div>}
            
        </div>
    );
}