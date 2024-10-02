import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Calendar } from 'react-calendar';
import Header from '../../components/Header/Header';
import { JournalEntryForm } from '../../components/JournalEntryForm/JournalEntryForm';
import MoodOptionsComponent from '../../components/JournalEntryForm/MoodOptionsComponent/MoodOptionsComponent';
import './CalendarPage.css';

import sprout from '../../assets/calendar-icons/sprout.png';
import halfBloom from '../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../assets/calendar-icons/full-bloom.png';
import faded from '../../assets/calendar-icons/faded.png';
import bubbly from '../../assets/calendar-icons/bubbly.png';

import BlinkingImage from '../../components/BlinkingImages/BlinkingImages';


function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalMood, setMood] = useState('');
  const [journalEntries, setJournalEntries] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState(''); // State for user's name


  const handleDarkModeChange = (isDarkMode) => {
    setDarkMode(isDarkMode);
    // Apply dark mode class to body element
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
  };

  // Ensure initial class application
  useEffect(() => {
    document.body.classList.add(darkMode ? 'dark-mode' : 'light-mode');
}, [darkMode]);


  useEffect(() => {
    axios.get('http://localhost:8000/api/entries')
      .then(response => {
        const entries = response.data.reduce((acc, entry) => {
          const date = new Date(entry.date).toISOString().split('T')[0];
          acc[date] = { title: entry.title, mood: entry.mood, entry: entry.entry, imageFile: entry.image, musicLink: entry.musicLink };
          return acc;
        }, {});
        setJournalEntries(entries);
      })
      .catch(error => {
        console.error('There was an error fetching the journal entries!', error);
      });

      // Fetch user data (make sure to adjust the URL according to your API)
    axios.get('http://localhost:8000/api/users') // Adjust this endpoint as necessary
    .then(response => {
      setUserName(response.data.name); // Adjust based on the actual structure of the response
    })
    .catch(error => {
      console.error('There was an error fetching the user data!', error);
    });
  }, []);

  const handleSaveEntry = useCallback((title, date, mood, entry, imageFile, musicLink) => {
    const formattedDate = date.toISOString().split('T')[0];
    const journalEntry = { title, date: formattedDate, mood, entry, image: imageFile, musicLink };

    axios.post('http://localhost:8000/api/entries', journalEntry)
      .then(response => {
        setJournalEntries(prevEntries => ({
          ...prevEntries,
          [formattedDate]: response.data,
        }));
      })
      .catch(error => {
        console.error('There was an error saving the journal entry!', error);
      });
  }, []);
  

  const dayTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const entry = journalEntries[formattedDate];
    if (entry && entry.mood === 'sprout') {
      return <div><img className='tile-content' src={sprout} alt="sprout" /></div>;
    } else if (entry && entry.mood === 'halfBloom') {
      return <div><img className='tile-content' src={halfBloom} alt="half bloom" /></div>;
    } else if (entry && entry.mood === 'fullBloom') {
      return <div><img className='tile-content' src={fullBloom} alt="full bloom" /></div>;
    } else if (entry && entry.mood === 'faded') {
      return <div><img className='tile-content' src={faded} alt="faded" /></div>;
    } else if (entry && entry.mood === 'bubbly') {
      return <div><img className='tile-content' src={bubbly} alt="bubbly" /></div>;
    } else if (!entry || entry.mood === '') {
      return <div><img className='tile-content' alt="" /></div>;
    }

    return null;
  };

  const entryForSelectedDate = journalEntries[selectedDate.toISOString().split('T')[0]];

  return (
    <div id = "landing-page">	  
      <Header onDarkModeChange={handleDarkModeChange} />
      <BlinkingImage />

      <div className='page-container'>
        <div className='calendar-container'>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={dayTileContent}
            />
          <MoodOptionsComponent setMood={setMood} moodInEntry={journalEntries[selectedDate.toISOString().split('T')[0]]?.mood || ''} />
        </div>

        <JournalEntryForm
          selectedDate={selectedDate}
          title={entryForSelectedDate ? entryForSelectedDate.title : ''}
          mood={journalMood}
          onSave={handleSaveEntry}
          entry={entryForSelectedDate ? entryForSelectedDate.entry : ''}
          imageFile={entryForSelectedDate ? entryForSelectedDate.imageFile : null}
          musicLink={entryForSelectedDate ? entryForSelectedDate.musicLink : ''}
        />
        </div>
    </div>
  );
}

export default CalendarPage;
