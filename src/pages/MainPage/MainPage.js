import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Calendar } from 'react-calendar';
import Header from '../../components/Header/Header';
import AnimatedToolbar from '../../components/AnimatedToolBar/AnimatedToolBar';
import MoodOptionsComponent from '../../components/MoodOptionsComponent/MoodOptionsComponent';
import './CalendarStyling.css';
import './MainPage.css';

import sprout from '../../assets/calendar-icons/sprout.png';
import halfBloom from '../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../assets/calendar-icons/full-bloom.png';
import faded from '../../assets/calendar-icons/faded.png';
import bubbly from '../../assets/calendar-icons/bubbly.png';

import BlinkingImage from '../../components/BlinkingImages/BlinkingImages';

function MainPage({onLogout}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('');

  const [journalTitle, setJournalTitle] = useState('');
  const [journalMood, setMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [journalImage, setJournalImage] = useState(null);
  const [journalMusicLink, setJournalMusicLink] = useState('');

  const [entryUnfilled, setEntryUnfilled] = useState(false);
  const [moodUnfilled, setMoodUnfilled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showAddMusic, setShowAddMusic] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const [musicButtonContent, setMusicButtonContent] = useState('Search');
  const [journalEntries, setJournalEntries] = useState({}); // Initialize journalEntries

  const handleDarkModeChange = (isDarkMode) => {
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entriesResponse = await axios.get('http://localhost:8000/api/entries');
        const entries = entriesResponse.data.reduce((acc, entry) => {
          const date = new Date(entry.date).toISOString().split('T')[0];
          acc[date] = { title: entry.title, mood: entry.mood, entry: entry.entry, imageFile: entry.image, musicLink: entry.musicLink };
          return acc;
        }, {});
        setJournalEntries(entries);
      } catch (error) {
        console.error('There was an error fetching data!', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveEntry = useCallback(async (title, date, mood, entry, imageFile, musicLink) => {
    const formattedDate = date.toISOString().split('T')[0];
    const journalEntry = { title, date: formattedDate, mood, entry, image: imageFile, musicLink };

    try {
      const response = await axios.post('http://localhost:8000/api/entries', journalEntry);
      setJournalEntries((prevEntries) => ({
        ...prevEntries,
        [formattedDate]: response.data,
      }));
    } catch (error) {
      console.error('There was an error saving the journal entry!', error);
    }
  }, []);

  const dayTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const entry = journalEntries[formattedDate];
    const moodIcons = {
      sprout: sprout,
      halfBloom: halfBloom,
      fullBloom: fullBloom,
      faded: faded,
      bubbly: bubbly,
    };

    return entry ? (
      <div>
        <img className='tile-content' src={moodIcons[entry.mood] || ''} alt={entry.mood} />
      </div>
    ) : (
      <div><img className='tile-content' alt="" /></div>
    );
  };

  const entryForSelectedDate = journalEntries[selectedDate.toISOString().split('T')[0]] || {};

  const convertSpotifyUrl = (url) => {
    if (!url) return '';
    const embedBaseUrl = "https://open.spotify.com/embed/track/";
    const trackId = url.split('/').pop();
    return `${embedBaseUrl}${trackId}?utm_source=generator&theme=0`;
  };

  const handleSearchMusicClick = () => {
    if (musicButtonContent === 'Search') {
      setJournalMusicLink(convertSpotifyUrl(journalMusicLink));
      setShowPlayer(true);
      setMusicButtonContent('Edit');
    } else {
      setJournalMusicLink('');
      setShowPlayer(false);
      setMusicButtonContent('Search');
    }
  };

  const handleSave = () => {
    if (journalMood && journalEntry) {
      setEntryUnfilled(false);
      setMoodUnfilled(false);
  
      const journal = {
        title: journalTitle,
        date: selectedDate,
        mood: journalMood,
        entry: journalEntry,
        image: journalImage,
        musicLink: journalMusicLink,
      };

      axios.post('http://localhost:8000/api/entries', journal)
        .then(response => {
          console.log('Journal saved:', response.data);
          // Clear fields
          setJournalTitle('');
          setJournalEntry('');
          setMood('');
          setJournalImage(null);
          setJournalMusicLink('');
        })
        .catch(error => {
          console.error('There was an error saving the journal!', error);
        });
    } else {
      setEntryUnfilled(!journalEntry);
      setMoodUnfilled(!journalMood);
    }
  };

  const handleAddOptions = (item) => {
    if (item === 'addImage') {
      setShowAddImage(true);
    } else if (item === 'addMusic') {
      setShowAddMusic(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setJournalImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="landing-page">	  
      <Header onDarkModeChange={handleDarkModeChange} onLogout={onLogout} />
      <BlinkingImage />
      <div className='page-container'>
        <div className='calendar-container'>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={dayTileContent}
          />
          <MoodOptionsComponent setMood={setMood} moodInEntry={entryForSelectedDate.mood || ''} />
        </div>

        <div className='journal-container'>
          <textarea className='title-textarea' placeholder='Title'
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
          />
          
          {showAddMusic && (
            <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '1rem'}}>
              <p>Song for the day: </p>
              {musicButtonContent === 'Search' && !showPlayer && (
                <textarea className='music-link-textarea' placeholder='Copy and paste Spotify link here...'
                  value={journalMusicLink}
                  onChange={(e) => setJournalMusicLink(e.target.value)}
                />
              )}
              <button className='music-search-button' onClick={handleSearchMusicClick}>{musicButtonContent}</button>
              {journalMusicLink && showPlayer && (
                <iframe style={{borderRadius:'1.5rem'}} src={journalMusicLink} width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              )}
            </div>
          )}

          {showAddImage && (
            <div>
              <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '1rem'}}>
                <p>Add image (optional):</p>
                <input type='file' onChange={handleImageUpload} />
              </div>
              {journalImage && <img className='uploaded-photo' src={journalImage} alt='Uploaded' />}
            </div>
          )}

          <p className={(entryUnfilled && journalEntry === '') ? 'alert' : 'initial'}>
            {entryUnfilled && journalEntry === '' && <span className='alert'>Entry is required</span>}
          </p>

          <textarea className='journal-textarea' placeholder='What happened today...'
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
          
          <AnimatedToolbar onItemClick={handleAddOptions} />

          <button className='save-button' onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
