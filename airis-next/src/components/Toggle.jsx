'use client'; 

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDarkMode); 
    root.classList.toggle('light', !isDarkMode); 
  }, [isDarkMode]); 

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode); 
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;
