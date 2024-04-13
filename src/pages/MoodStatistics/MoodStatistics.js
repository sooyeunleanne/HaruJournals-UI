import React, { useCallback, useState } from 'react';
import '../MoodStatistics/MoodStatistics.css';

export function MoodStatistics() {
    const [openMoodStatistics, setMoodStatistics] = useState(false);

    const onMoodStatisticsClick = useCallback(() => {
        setMoodStatistics(true);
    }, []);

    const onCloseClick = useCallback(() => {
        setMoodStatistics(false);
    }, []);

    return (
        <div>
            <button className='open-button' onClick={onMoodStatisticsClick}>View your mood for this month</button>
            {openMoodStatistics && <StatisticsPopupComponent onCloseClick={onCloseClick} />}
        </div>
    );
}

function StatisticsPopupComponent({ onCloseClick }) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <div>Put the growing cat here!</div>
        </div>
    );
}

export default MoodStatistics;
