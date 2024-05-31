import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-calendar';
import { Header } from '../../components/Header/Header';
import { JournalEntryForm } from '../../components/JournalEntryForm/JournalEntryForm';
import './CalendarPage.css';

import happyicon from '../../assets/emotion-icons/happy.png';
import excitedicon from '../../assets/emotion-icons/excited.png';
import neutralicon from '../../assets/emotion-icons/neutral.png';
import concernedicon from '../../assets/emotion-icons/concerned.png';
import lovedicon from '../../assets/emotion-icons/loved.png';
import tiredicon from '../../assets/emotion-icons/tired.png';
import sadicon from '../../assets/emotion-icons/sad.png';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({});

  const handleSaveEntry = useCallback((date, mood, entry, imageFile, musicLink) => {
	setJournalEntries(prevEntries => ({
	  ...prevEntries,
	  [date.toDateString()]: { mood, entry, imageFile, musicLink }, // Store mood and entry based on date string
	}));
  }, []);
  
  const dayTileContent = ({ date }) => {
    const entry = journalEntries[date.toDateString()];
    if (entry && entry.mood === 'happy') {
      return <div><img src={happyicon}></img></div>;
    }
	else if (entry && entry.mood === 'sad') {
		return <div><img src={sadicon}></img></div>;
	}
	else if (entry && entry.mood === 'excited') {
		return <div><img src={excitedicon}></img></div>;
	}
	else if (entry && entry.mood === 'tired') {
		return <div><img src={tiredicon}></img></div>;
	}
	else if (entry && entry.mood === 'loved') {
		return <div><img src={lovedicon}></img></div>;
	}
	else if (entry && entry.mood === 'neutral') {
		return <div><img src={neutralicon}></img></div>;
	}
	else if (entry && entry.mood === 'concerned') {
		return <div><img src={concernedicon}></img></div>;
	}

    return null;
  };

  return (
    <div>	  
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

	  {/* <div>uncomment to see how journal entries are saved ~</div> */}
			{/* <div>
			<h2>Saved Journal Entries</h2>
			<ul>
			{Object.entries(journalEntries).map(([date, entry]) => (
			<li key={date}>
				<strong>{date}</strong>: Mood: {entry.mood}, Entry: {entry.entry}
			</li>
			))}

			</ul>
			</div> */}
    </div>
  );
}

export default CalendarPage;
