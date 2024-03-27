import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalID);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className='clock-container'>
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Clock;
