import React from 'react';
import { Link } from 'react-router-dom';

const MainBottom = () => {
  return (
    <div>
      <h2>Choose a Box</h2>
      <div className="card-container">
        <Link to="/singlebox/1" className="card">
          <h3>G1</h3>
        </Link>
        <Link to="/singlebox/2" className="card">
          <h3>G2</h3>
        </Link>
        <Link to="/singlebox/3" className="card">
          <h3>G3</h3>
        </Link>
        <Link to="/singlebox/4" className="card">
          <h3>G4</h3>
        </Link>
        <Link to="/singlebox/5" className="card">
          <h3>G5</h3>
        </Link>
        <Link to="/singlebox/6" className="card">
          <h3>Archive</h3>
        </Link>
      </div>
    </div>
  );
};

export default MainBottom;
