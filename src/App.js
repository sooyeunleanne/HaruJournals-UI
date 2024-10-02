import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;

