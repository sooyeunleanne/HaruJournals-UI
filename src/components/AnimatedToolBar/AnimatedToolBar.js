import React, { useState } from 'react';
import './AnimatedToolbar.css'; // Import your CSS file for styling

import addIcon from '../../assets/light-mode/addIcon.png';
import addImage from '../../assets/light-mode/addImageIcon.png';
import addMusic from '../../assets/light-mode/addMusicIcon.png';

const AnimatedToolbar = ({onItemClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleItemClick = (item) => {
    onItemClick(item); // Pass item information to parent component
  };

  return (
    <div
      className={`animated-toolbar ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (<img className='add-button' src={addIcon}/>)}
      {isHovered && (
        <div className="toolbar-items">
          <img className="toolbar-item" onClick={() => handleItemClick('addMusic')} src={addMusic}></img>
          <img className="toolbar-item" onClick={() => handleItemClick('addImage')} src={addImage}></img>
        </div>
      )}
    </div>
  );
};

export default AnimatedToolbar;
