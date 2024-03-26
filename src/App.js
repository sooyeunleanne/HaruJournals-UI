import {useState} from 'react'; 
import './App.css';
import CalendarPage from './pages/CalendarPage';
import Pet from './components/PetButton/Pet';

function App() {
  return (
    <div>
      <Pet />
      <CalendarPage />
    </div>
  );
}

export default App;

