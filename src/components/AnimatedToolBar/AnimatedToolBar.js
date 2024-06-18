import React, { useState } from 'react';
import './AnimatedToolbar.css'; // Import your CSS file for styling

const AnimatedToolbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`animated-toolbar ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (<p>+</p>)}
      {isHovered && (
        <div className="toolbar-items">
          <button className="toolbar-item">Item 1</button>
          <button className="toolbar-item">Item 2</button>
          <button className="toolbar-item">Add image</button>
        </div>
      )}
    </div>
  );
};

export default AnimatedToolbar;
