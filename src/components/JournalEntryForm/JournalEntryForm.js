import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './JournalEntryForm.css';

import happyicon from '../../assets/emotion-icons/happy.png';
import excitedicon from '../../assets/emotion-icons/excited.png';
import neutralicon from '../../assets/emotion-icons/neutral.png';
import concernedicon from '../../assets/emotion-icons/concerned.png';
import lovedicon from '../../assets/emotion-icons/loved.png';
import tiredicon from '../../assets/emotion-icons/tired.png';
import sadicon from '../../assets/emotion-icons/sad.png';

function MoodOptionsComponent({ setMood, moodInEntry }) {
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
      <div className={`mood-button ${selectedMood === 'happy' && 'selected'}`} onClick={() => handleMoodClick('happy')}><img src={happyicon}></img></div>
      <div className={`mood-button ${selectedMood === 'sad' && 'selected'}`} onClick={() => handleMoodClick('sad')}><img src={sadicon}></img></div>
      <div className={`mood-button ${selectedMood === 'angry' && 'selected'}`} onClick={() => handleMoodClick('excited')}><img src={excitedicon}></img></div>
      <div className={`mood-button ${selectedMood === 'tired' && 'selected'}`} onClick={() => handleMoodClick('tired')}><img src={tiredicon}></img></div>
      <div className={`mood-button ${selectedMood === 'loved' && 'selected'}`} onClick={() => handleMoodClick('loved')}><img src={lovedicon}></img></div>
      <div className={`mood-button ${selectedMood === 'loved' && 'selected'}`} onClick={() => handleMoodClick('neutral')}><img src={neutralicon}></img></div>
      <div className={`mood-button ${selectedMood === 'loved' && 'selected'}`} onClick={() => handleMoodClick('concerned')}><img src={concernedicon}></img></div>


    </div>
  );
}

export const JournalEntryForm = ({ selectedDate, onSave, entry, mood }) => {
  const [journalMood, setMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  useEffect(() => {
    setJournalEntry(entry || ''); // Set the initial value of the textarea
    setMood(mood || ''); // Set the initial value of the textarea
  }, [entry, mood]);

  const handleSave = () => {
    onSave(selectedDate, journalMood, journalEntry); // Pass mood to onSave function
    setJournalEntry(entry);
    setMood(mood);
  };


  return (
    <div className='journal-container'>
      <div className='heading-container'>
        <h2>{selectedDate.getFullYear()}</h2>
        <h1>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate).toUpperCase()}</h1> 
      </div>
      <MoodOptionsComponent setMood={setMood} moodInEntry={journalMood}/>
      <textarea className='journal-textarea' type="text"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
      />
      <button className='save-button' onClick={handleSave}>Save</button>
    </div>
  );
};

JournalEntryForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  entry: PropTypes.string,
};