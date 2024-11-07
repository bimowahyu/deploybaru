// components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // Custom CSS for additional styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/recap">Home</a></li>
        <li><a href="/upload">Upload Excel</a></li>
        <li><a href="/export">Export to Excel</a></li>
        <li><a href="/add-data">Tambah Data</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
