import React, { useState, useCallback } from 'react';
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

  const handleSaveEntry = useCallback((date, mood, entry, imageFile, musicLink) => {
	setJournalEntries(prevEntries => ({
	  ...prevEntries,
	  [date.toDateString()]: { mood, entry, imageFile, musicLink }, // Store mood and entry based on date string
	}));
  }, []);
  
  const dayTileContent = ({ date }) => {
    const entry = journalEntries[date.toDateString()];
    if (entry && entry.mood === 'sprout') {
      return <div><img src={sprout}></img></div>;
    }
	else if (entry && entry.mood === 'halfBloom') {
		return <div><img src={halfBloom}></img></div>;
	}
	else if (entry && entry.mood === 'fullBloom') {
		return <div><img src={fullBloom}></img></div>;
	}
	else if (entry && entry.mood === 'faded') {
		return <div><img src={faded}></img></div>;
	}
	else if (!entry || entry.mood == '') {
		return <div><img></img></div>
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
