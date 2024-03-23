import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainTop from "../../components/MainTop/MainTop";
import Header from "../../components/Header/Header";
import MainBottom from "../../components/MainBottom/MainBottom";
import "./Home.scss";
import ProfileTop from "../../components/ProfileTop/ProfileTop";
import OverDue from "../../components/OverDue/OverDue";
import OverDueSlider from "../../components/OverDueSlider/OverDueSlider";

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
    <div className="container-all">
      <Header />
      <div className="container-inner">
        <ProfileTop nameOfUser={loggedInUserName} dataOfUser={userData} />
        <div className="mainhome-all">
          <div className="mainHome">
            <MainTop />
            <MainBottom />
          </div>
          <div className="sidebar">
            <OverDueSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
