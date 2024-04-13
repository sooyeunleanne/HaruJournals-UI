import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-calendar';
import Pet from '../PetPage/Pet';
import Header from '../../components/Header/Header';
import { JournalEntryForm } from '../../components/JournalEntryForm/JournalEntryForm';
import './CalendarPage.css';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntries, setJournalEntries] = useState({});

  const handleSaveEntry = useCallback((date, mood, entry) => {
	setJournalEntries(prevEntries => ({
	  ...prevEntries,
	  [date.toDateString()]: { mood, entry }, // Store mood and entry based on date string
	}));
  }, []);
  
  const dayTileContent = ({ date }) => {
    const entry = journalEntries[date.toDateString()];
    if (entry && entry.mood === 'happy') {
      return <div>😀</div>;
    }
	else if (entry && entry.mood === 'sad') {
		return <div>🥲</div>;
	}
	else if (entry && entry.mood === 'angry') {
		return <div>😡</div>;
	}
	else if (entry && entry.mood === 'tired') {
		return <div>😩</div>;
	}
	else if (entry && entry.mood === 'loved') {
		return <div>🥰</div>;
	}

    return null;
  };

  return (
    <div>
      {/* <Header /> */}

      <div className='calendar-container'>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={dayTileContent}
        />

        <JournalEntryForm
          selectedDate={selectedDate}
          onSave={handleSaveEntry}
          entry={journalEntries[selectedDate.toDateString()]?.entry} // Pass entry for selected date
        />
      </div>

      {/* <Pet /> */}

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
