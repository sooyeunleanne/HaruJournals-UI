import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
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

  const PrivateRoute = ({ children, loginSuccess }) => {
    return loginSuccess ? children : <Navigate to="/" />;
  };
  

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
          <Route
            path="/calendar"
            element={
              <PrivateRoute loginSuccess={loginSuccess}>
                <MainPage onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    );
  }

export default App;

