import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './JournalEntryForm.css';
import MoodOptionsComponent from './MoodOptionsComponent/MoodOptionsComponent';

import sprout from '../../assets/calendar-icons/sprout.png';
import halfBloom from '../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../assets/calendar-icons/full-bloom.png';
import faded from '../../assets/calendar-icons/faded.png';

export const JournalEntryForm = ({ selectedDate, onSave, entry, mood, imageFile, musicLink }) => {
  const [journalMood, setMood] = useState(mood);
  const [journalEntry, setJournalEntry] = useState(entry);
  const [journalImage, setJournalImage] = useState(imageFile);
  const [journalMusicLink, setJournalMusicLink] = useState(musicLink);
  const [entryUnfilled, setEntryUnfilled] = useState(false);
  const [moodUnfilled, setMoodUnfilled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setJournalEntry(entry || '');
    setMood(mood || '');
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

  const handleSearchMusicClick = () => {
    setJournalMusicLink(convertSpotifyUrl(journalMusicLink));
    setShowPlayer(true);
  };

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
          // Update state or provide feedback to the user here
          onSave(selectedDate, journalMood, journalEntry, journalImage, journalMusicLink);
          setJournalEntry('');
          setMood('');
          setJournalImage(null);
          setJournalMusicLink('');
        })
        .catch(error => {
          console.error('There was an error saving the journal!', error);
        });
    } else {
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
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <p>Add your song for the day: </p>
        <textarea className='music-link-textarea' type="text"
        value={journalMusicLink}
        onChange={(e) => setJournalMusicLink(e.target.value)}
        />
        <button onClick={handleSearchMusicClick}>Search</button>
        {((journalMusicLink !== '') && showPlayer) && 
        <iframe
            src={journalMusicLink}
            width="100%"
            height="152"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowTransparency="true"
            loading="lazy"
            className="transparent-iframe"
          ></iframe>
      }
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