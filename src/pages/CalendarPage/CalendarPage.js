import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Calendar } from 'react-calendar';
import { Header } from '../../components/Header/Header';
import { JournalEntryForm } from '../../components/JournalEntryForm/JournalEntryForm';
import './CalendarPage.css';

import sprout from '../../assets/calendar-icons/sprout.png';
import halfBloom from '../../assets/calendar-icons/half-bloom.png';
import fullBloom from '../../assets/calendar-icons/full-bloom.png';
import faded from '../../assets/calendar-icons/faded.png';


function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/journals')
      .then(response => {
        const entries = response.data.reduce((acc, entry) => {
          const date = new Date(entry.date).toISOString().split('T')[0];
          acc[date] = { mood: entry.mood, entry: entry.entry, imageFile: entry.image, musicLink: entry.musicLink };
          return acc;
        }, {});
        setJournalEntries(entries);
      })
      .catch(error => {
        console.error('There was an error fetching the journal entries!', error);
      });
  }, []);

  const handleSaveEntry = useCallback((date, mood, entry, imageFile, musicLink) => {
    const formattedDate = date.toISOString().split('T')[0];
    setJournalEntries(prevEntries => ({
      ...prevEntries,
      [formattedDate]: { mood, entry, imageFile, musicLink },
    }));
  }, []);

  const dayTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const entry = journalEntries[formattedDate];
    if (entry && entry.mood === 'sprout') {
      return <div><img src={sprout} alt="sprout" /></div>;
    } else if (entry && entry.mood === 'halfBloom') {
      return <div><img src={halfBloom} alt="half bloom" /></div>;
    } else if (entry && entry.mood === 'fullBloom') {
      return <div><img src={fullBloom} alt="full bloom" /></div>;
    } else if (entry && entry.mood === 'faded') {
      return <div><img src={faded} alt="faded" /></div>;
    } else if (!entry || entry.mood === '') {
      return <div><img alt="" /></div>;
    }

    return null;
  };

  return (
    <div id = "landing-page">	  
		<Header />
      <div className='page-container'>
		<div className='calendar-container'>
			<Calendar
				onChange={setSelectedDate}
				value={selectedDate}
				tileContent={dayTileContent}
				/>
		</div>

        <JournalEntryForm
          selectedDate={selectedDate}
          onSave={handleSaveEntry}
          entry={journalEntries[selectedDate.toDateString()]?.entry} // Pass entry for selected date
		  mood={journalEntries[selectedDate.toDateString()]?.mood}
		  imageFile={journalEntries[selectedDate.toDateString()]?.imageFile}
		  musicLink={journalEntries[selectedDate.toDateString()]?.musicLink}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
