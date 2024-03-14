import React from "react";
import "./MainTop.css";
import { Link } from 'react-router-dom';


const MainTop = () => {
  return (
    <div className="main-top">
      <Link to="/ten-new-words">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="leaf-icon"
          viewBox="0 0 24 24"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.86 2.39 7.17 5.77 8.49.42.14.88.26 1.35.37l.88.17.88-.17c.47-.11.93-.23 1.35-.37C19.61 19.17 22 15.86 22 12c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-3.31 2.55-6.01 5.77-6.36.47-.07.93-.14 1.35-.19l.88-.1V4h1v1.35l.88.1c.42.05.88.12 1.35.19C17.45 5.99 20 8.69 20 12c0 4.41-3.59 8-8 8zm-1-7h-2v-2h2v2zm0-4h-2V7h2v2z" />
        </svg>
        Learn 10 new words
      </Link>
      <Link to="/settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="leaf-icon"
          viewBox="0 0 24 24"
        >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.86 2.39 7.17 5.77 8.49.42.14.88.26 1.35.37l.88.17.88-.17c.47-.11.93-.23 1.35-.37C19.61 19.17 22 15.86 22 12c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-3.31 2.55-6.01 5.77-6.36.47-.07.93-.14 1.35-.19l.88-.1V4h1v1.35l.88.1c.42.05.88.12 1.35.19C17.45 5.99 20 8.69 20 12c0 4.41-3.59 8-8 8zm-1-7h-2v-2h2v2zm0-4h-2V7h2v2z" fill="#006400" />
        </svg>
        Words Due today
      </Link>
    </div>
  );
};

export default MainTop;
