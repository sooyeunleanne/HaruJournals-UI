import React, { useState, useEffect } from 'react';

import sprout from '../../../assets/calendar-icons/sprout.png';
import halfBloom from '../../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../../assets/calendar-icons/full-bloom.png';
import faded from '../../../assets/calendar-icons/faded.png';

export default function MoodOptionsComponent({ setMood, moodInEntry }) {
    const [selectedMood, setSelectedMood] = useState(null);
  
    useEffect(() => {
      setSelectedMood(moodInEntry); // Set the initial value of the textarea
    }, [moodInEntry]);
  
    const handleMoodClick = (mood) => {
      setMood(mood);
      setSelectedMood(mood); // Update the selected mood state
    };
  
    return (
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <p>How fulfilling was today?</p>
        <div className={`mood-button ${selectedMood === 'sprout' && 'selected'}`} onClick={() => handleMoodClick('sprout')}><img src={sprout}></img></div>
        <div className={`mood-button ${selectedMood === 'halfBloom' && 'selected'}`} onClick={() => handleMoodClick('halfBloom')}><img src={halfBloom}></img></div>
        <div className={`mood-button ${selectedMood === 'fullBloom' && 'selected'}`} onClick={() => handleMoodClick('fullBloom')}><img src={fullBloom}></img></div>
        <div className={`mood-button ${selectedMood === 'faded' && 'selected'}`} onClick={() => handleMoodClick('faded')}><img src={faded}></img></div>
      </div>
    );
  }