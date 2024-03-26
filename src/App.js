import {useState} from 'react'; 
import Calendar from 'react-calendar';
import {InputForm} from './components/Input';
import './App.css';

function App() {
  if (localStorage.getItem("journal") == null) {
    localStorage.setItem("journal", "");
  }

  const [date, setDate] = useState(new Date());
  // const [journal, setJournal] = useState(JSON.parse(localStorage.getItem("journal")));

  // const updateJournal = eachEntry => {
  //   setJournal([...journal, eachEntry]);
  //   localStorage.setItem("journal", JSON.stringify([...journal, eachEntry]))
  // };

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="main">
        <div className="calendar-container"> 
          <Calendar onChange={setDate} value={date} />
        </div>
        <div>
          {date.toDateString()}
        </div>
        {/* <InputForm updateJournal={updateJournal} /> */}
        {/* https://stackoverflow.com/questions/65617851/in-reactjs-how-to-store-data-as-json-while-clicking-submit-button */}
      </div>
    </div>
  );
}

export default App;
