import React, { useState, useEffect } from 'react';
import './MoodOptionsComponent.css';

import sprout from '../../../assets/calendar-icons/sprout.png';
import halfBloom from '../../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../../assets/calendar-icons/full-bloom.png';
import faded from '../../../assets/calendar-icons/faded.png';
import bubbly from '../../../assets/calendar-icons/bubbly.png';

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
      <div className='mood-options-bar'>
        <p style={{width: '7rem'}}>How fulfilling was today?</p>
        <div className={`mood-button ${selectedMood === 'sprout' && 'selected'}`} onClick={() => handleMoodClick('sprout')}><img src={sprout}></img></div>
        <div className={`mood-button ${selectedMood === 'halfBloom' && 'selected'}`} onClick={() => handleMoodClick('halfBloom')}><img src={halfBloom}></img></div>
        <div className={`mood-button ${selectedMood === 'fullBloom' && 'selected'}`} onClick={() => handleMoodClick('fullBloom')}><img src={fullBloom}></img></div>
        <div className={`mood-button ${selectedMood === 'bubbly' && 'selected'}`} onClick={() => handleMoodClick('bubbly')}><img src={bubbly}></img></div>
        <div className={`mood-button ${selectedMood === 'faded' && 'selected'}`} onClick={() => handleMoodClick('faded')}><img src={faded}></img></div>
      </div>
    );
  }