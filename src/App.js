import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import MainPage from './pages/MainPage';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  // A function to handle login success
  const handleLogin = () => {
    setLoginSuccess(true);
  };

  const handleLogout = () => {
    setLoginSuccess(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onLogin={handleLogin}/>} />
        {loginSuccess && <Route path="/calendar" element={<MainPage onLogout={handleLogout} />} />
}
      </Routes>
    </Router>
  );
}

export default App;

