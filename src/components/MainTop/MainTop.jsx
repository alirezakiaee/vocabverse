import React from "react";
import "./MainTop.scss";
import { Link } from "react-router-dom";
import dueTodayIcon from "../../assets/Icons/due-today.png";
import learnTodayIcon from "../../assets/Icons/learn.png";

const MainTop = () => {
  const userId = localStorage.getItem("user_id");
  return (
    <div className="main-top">
      <Link to="/ten-new-words">
        <div className="main-top__button">
          <img src={learnTodayIcon} alt="Leanr" />
          Learn words with AI
        </div>
      </Link>
      <Link to="/due-today/">
        <div className="main-top__button">
          <img src={dueTodayIcon} alt="calendar" />
          Words Due today
        </div>
      </Link>
    </div>
  );
};

export default MainTop;
