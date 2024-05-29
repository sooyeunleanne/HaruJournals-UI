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

export const JournalEntryForm = ({ selectedDate, onSave, entry, mood, imageFile, musicLink }) => {
  //handling the entries
  const [journalMood, setMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [journalImage, setJournalImage] = useState(null);
  const [journalMusicLink, setJournalMusicLink] = useState('');

  //handling the alerts
  const [entryUnfilled, setEntryUnfilled] = useState(false);
  const [moodUnfilled, setMoodUnfilled] = useState(false);

  useEffect(() => {
    setJournalEntry(entry || ''); // Set the initial value of the textarea
    setMood(mood || ''); // Set the initial value of the textarea
    setJournalImage(imageFile || null);
    setJournalMusicLink(musicLink || '');
  }, [entry, mood, imageFile, musicLink]);

  function handleImageUpload(e) {
    setJournalImage(URL.createObjectURL(e.target.files[0]));
  }

  function convertSpotifyUrl(url) {
    // Define the base URL for embedding
    const embedBaseUrl = "https://open.spotify.com/embed/track/";
    const queryParams = "?utm_source=generator&theme=0";
    
    // Extract the track ID from the original URL
    const urlParts = url.split('/');
    const trackId = urlParts[urlParts.length - 1];
    
    // Construct the new embeddable URL
    const embedUrl = `${embedBaseUrl}${trackId}${queryParams}`;
    
    return embedUrl;
  }

  const handleSave = () => {
    if (journalMood !== '' && journalEntry !== '') {
      setEntryUnfilled(false);
      setMoodUnfilled(false);

      onSave(selectedDate, journalMood, journalEntry, journalImage, journalMusicLink); // Pass mood to onSave function
      setJournalEntry(entry);
      setMood(mood);
      setJournalImage(imageFile);
      setJournalMusicLink(musicLink);
    }
    else {
      if (journalMood === '') {
        setMoodUnfilled(true);
      }
      if (journalEntry === '') {
        setEntryUnfilled(true);
      }
    }
  };


  return (
    <div className='journal-container'>
      <div className='heading-container'>
        <h2>{selectedDate.getFullYear()}</h2>
        <h1>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate).toUpperCase()}</h1> 
      </div>

      <p className={(moodUnfilled && journalMood === '') ? 'alert' : 'initial'}> 
      {(moodUnfilled && journalMood === '') && <span className='alert'>Missing! </span>}
      Pick your mood:</p>
      <MoodOptionsComponent setMood={setMood} moodInEntry={journalMood}/>

      <div>
        <p>Add image (optional):</p>
        <img className='uploaded-photo' src={journalImage}/>
        <br/>
        <input type='file' onChange={handleImageUpload}/>
      </div>

      <div>
        <p>Add your song for the day:</p>
        <textarea type="text"
        value={journalMusicLink}
        onChange={(e) => setJournalMusicLink(convertSpotifyUrl(e.target.value))}
      />
        <iframe src={journalMusicLink} width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>

      <p className={(entryUnfilled && journalEntry === '') ? 'alert' : 'initial'}>
      {(entryUnfilled && journalEntry === '') && <span className='alert'>Missing! </span>}
      Journal your day:</p> 
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
  mood: PropTypes.string
};