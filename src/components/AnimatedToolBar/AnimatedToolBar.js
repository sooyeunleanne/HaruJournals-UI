import React, { useState } from 'react';
import './AnimatedToolbar.css'; // Import your CSS file for styling

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
      {!isHovered && (<p>+</p>)}
      {isHovered && (
        <div className="toolbar-items">
          <button className="toolbar-item" onClick={() => handleItemClick('addMusic')}>
            Music
          </button>
          <button className="toolbar-item" onClick={() => handleItemClick('addImage')}>
            Image
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimatedToolbar;
