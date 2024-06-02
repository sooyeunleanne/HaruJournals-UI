import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './JournalEntryForm.css';

import sprout from '../../assets/calendar-icons/sprout.png';
import halfBloom from '../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../assets/calendar-icons/full-bloom.png';
import faded from '../../assets/calendar-icons/faded.png';

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
      <div className={`mood-button ${selectedMood === 'sprout' && 'selected'}`} onClick={() => handleMoodClick('sprout')}><img src={sprout}></img></div>
      <div className={`mood-button ${selectedMood === 'halfBloom' && 'selected'}`} onClick={() => handleMoodClick('halfBloom')}><img src={halfBloom}></img></div>
      <div className={`mood-button ${selectedMood === 'fullBloom' && 'selected'}`} onClick={() => handleMoodClick('fullBloom')}><img src={fullBloom}></img></div>
      <div className={`mood-button ${selectedMood === 'faded' && 'selected'}`} onClick={() => handleMoodClick('faded')}><img src={faded}></img></div>
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

    const embedUrl = `${embedBaseUrl}${trackId}${queryParams}`;

    // Construct the new embeddable URL
    if (url === '') return '';

    return embedUrl;
  }

  const handleSave = () => {
    if (journalMood !== '' && journalEntry !== '') {
      setEntryUnfilled(false);
      setMoodUnfilled(false);

      const journal = {
        date: selectedDate,
        mood: journalMood,
        entry: journalEntry,
        image: journalImage,
        musicLink: journalMusicLink
      };

      axios.post('http://localhost:8080/api/journals', journal)
        .then(response => {
          console.log('Journal saved:', response.data);
        })
        .catch(error => {
          console.error('There was an error saving the journal!', error);
        });

      setJournalEntry(entry);
      setMood(mood);
      setJournalImage(imageFile);
      setJournalMusicLink(musicLink);

      // setJournalEntry('');
      // setMood('');
      // setJournalImage(null);
      // setJournalMusicLink('');
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
      <p className={(moodUnfilled && journalMood === '') ? 'alert' : 'initial'}> 
      {(moodUnfilled && journalMood === '') && <span className='alert'>Missing! </span>}
      <b>Pick your mood:</b></p>
      <MoodOptionsComponent setMood={setMood} moodInEntry={journalMood}/>

      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <p>Add your song for the day: </p>
        <textarea className='music-link-textarea' type="text"
        value={journalMusicLink}
        onChange={(e) => setJournalMusicLink(convertSpotifyUrl(e.target.value))}
        />
        {(journalMusicLink !== '') && <iframe src={journalMusicLink} width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
      </div>

      <p className={(entryUnfilled && journalEntry === '') ? 'alert' : 'initial'}>
      {(entryUnfilled && journalEntry === '') && <span className='alert'>Missing! </span>}
      Journal your day:</p> 
      <textarea className='journal-textarea' type="text"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
      />

      <p>Add image (optional):</p>
        <img className='uploaded-photo' src={journalImage}/>
        <br/>
        <input type='file' onChange={handleImageUpload}/>
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