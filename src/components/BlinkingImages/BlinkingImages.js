import React, { useState, useEffect } from 'react';
import './BlinkingImages.css'

import star from '../../assets/light-mode/star.png';
import planet from '../../assets/light-mode/saturn.png';

const BlinkingImage = () => {
  const [isStar1Visible, setIsStar1Visible] = useState(true);
  const [isStar2Visible, setIsStar2Visible] = useState(true);
  const [isStar3Visible, setIsStar3Visible] = useState(true);

  useEffect(() => {
    // Function to toggle visibility
    const toggleVisibilityStar1 = () => {
        setIsStar1Visible(prev => !prev); // Toggle visibility
    };
    const intervalStar1 = setInterval(toggleVisibilityStar1, 2000);

    const toggleVisibilityStar2 = () => {
        setIsStar2Visible(prev => !prev); // Toggle visibility
    };
    const intervalStar2 = setInterval(toggleVisibilityStar2, 2700);

    const toggleVisibilityStar3 = () => {
        setIsStar3Visible(prev => !prev); // Toggle visibility
    };
    const intervalStar3 = setInterval(toggleVisibilityStar3, 2300);


    // Clear interval on component unmount to avoid memory leaks
    return () =>  {
        clearInterval(intervalStar1);
        clearInterval(intervalStar2);
        clearInterval(intervalStar3);
    }
  }, []); 

  return (
    <div>

        <div className='star1-container'>
        <img
            className={`blinking-image ${isStar1Visible ? 'visible' : 'hidden'}`}
            src={star}
            alt="Blinking Image"
        />
        </div>
        <div className='star2-container'>
        <img
            className={`blinking-image ${isStar2Visible ? 'visible' : 'hidden'}`}
            src={star}
            alt="Blinking Image"
            />
        </div>
        <div className='star3-container'>
        <img
            className={`blinking-image ${isStar3Visible ? 'visible' : 'hidden'}`}
            src={star}
            alt="Blinking Image"
            />
        </div>

        <img className='moving-planet' src={planet}></img>
    </div>
    
  );
};

export default BlinkingImage;
