import React from "react";
import MainTop from "../../components/MainTop/MainTop";
import Header from "../../components/Header/Header";
import MainBottom from "../../components/MainBottom/MainBottom";
import "./Home.scss";

export const Home = () => {
  return (
    <div>
      <div className="home">
        <Header />
        <MainTop />
        <MainBottom />
      </div>
    </div>
  );
};

export default Home;
