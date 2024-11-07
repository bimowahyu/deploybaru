import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export const LayoutMap = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <Sidebar />
      <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        {/* Add any specific content for SurveyorMap here */}
        <h2>Surveyor Map</h2>
        {/* Remove {props.children} if not needed */}
      </div>
    </div>
  );
};
