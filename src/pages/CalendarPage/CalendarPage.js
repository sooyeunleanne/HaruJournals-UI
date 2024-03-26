import React from 'react';
import {useState} from 'react'; 
import Calendar from 'react-calendar';
import './CalendarPage.css';
import {JournalEntryForm} from '../../components/JournalEntryForm/JournalEntryForm';

function CalendarPage () {

	const [selectedDate, setSelectedDate] = useState(new Date());
  
	const [journalEntries, setJournalEntries] = useState({});
  
	const handleSaveEntry = (date, entry) => {
	  setJournalEntries({
		...journalEntries,
		[date.toDateString()]: entry, //store entry based on date string
	  });
	};
  
	return (
	  <div className='calendar-container'>
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

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class CalendarPage extends React.Component {
//   render() {
//     return <div>This is a component called CalendarPage.</div>;
//   }
// }

// const CalendarPagePropTypes = {
// 	// always use prop types!
// };

// CalendarPage.propTypes = CalendarPagePropTypes;

export default CalendarPage;
