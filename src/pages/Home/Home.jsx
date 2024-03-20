import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import profileImage from "../../assets/Icons/profile.png";
import { Link } from "react-router-dom";
import MainTop from "../../components/MainTop/MainTop";
import Header from "../../components/Header/Header";
import MainBottom from "../../components/MainBottom/MainBottom";
import "./Home.scss";

export const Home = () => {
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
  const loggedInUserName = userData ? userData.name : "";
  return (
    <div>
      <div className="home">
        <Header />
        <div className="profile">
          <div>
            <Link to="/profile">
              <img src={profileImage} alt="profile" />
            </Link>
          </div>
          welcome{userData && <span> {loggedInUserName}</span>}
        </div>
        <MainTop />
        <MainBottom />
      </div>
    </div>
  );
};

export default Home;
