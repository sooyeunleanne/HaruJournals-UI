import {useState} from 'react'; 
import './App.css';
import CalendarPage from './UI/pages/CalendarPage';
import Pet from './UI/pages/PetPage/Pet';

function App() {
  return (
    <div>
      <Pet />
      <CalendarPage />
    </div>
  );
}

export default App;

