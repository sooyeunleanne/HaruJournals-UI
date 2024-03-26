import {useState} from 'react'; 
import Calendar from 'react-calendar';
import {JournalEntryForm} from './components/JournalEntryForm';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [journalEntries, setJournalEntries] = useState({});

  const handleSaveEntry = (date, entry) => {
    setJournalEntries({
      ...journalEntries,
      [date.toDateString()]: entry, //store entry based on date string
    });
  };

  return (
    <div>
      <h1>Selected Date: {selectedDate.toDateString()}</h1>
      <Calendar onChange={setSelectedDate}
        value={selectedDate} />

      <JournalEntryForm
          selectedDate={selectedDate}
          onSave={handleSaveEntry}
          entry={journalEntries[selectedDate.toDateString()]} // Pass entry for selected date
        />

      {/* <div>uncomment to see how journal entries are saved ~</div> */}
      {/* <div>
        <h2>Saved Journal Entries</h2>
        <ul>
          {Object.entries(journalEntries).map(([date, entry]) => (
            <li key={date}>
              <strong>{date}</strong>: {entry}
            </li>
          ))}
        </ul>
      </div> */} 
    </div>
  );
}

export default App;

