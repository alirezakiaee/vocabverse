import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.scss";
import logo from "../../assets/Logo/vocabverse-logo-white.png";
import profileImage from "../../assets/Icons/profile.png";
import dashboard_image from "../../assets/Icons/vocabverse-logo-white-sqr.png";

const Header = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Check if userData is null before accessing its properties
  const selectedLanguage = userData ? userData.name : "";
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="home" />
        </div>
        <div className="dashboard_icon">
          <img src={dashboard_image} alt="profile" />
          <h2>Dashboard</h2>
        </div>
        <div className="profile">
          <div>
            <Link to="/profile">
              <img src={profileImage} alt="profile" />
            </Link>
          </div>
          welcome{userData && <span> {selectedLanguage}</span>}
        </div>
        <div className="header__menu">
          <Link to="/settings">
            <img src="settings_image_url" alt="settings" />
          </Link>
          <Link to="/home">
            <img src="./logo-new.svg" alt="home" />
          </Link>
        </div>
        {/* Display userData.id only if userData exists */}
        <div className="back">
          <button onClick={goBack}>Back</button>
        </div>
      </div>
    </>
  );
};

export default Header;
