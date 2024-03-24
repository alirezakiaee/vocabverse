import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import moment from "moment";
import "./OverDueSlider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OverDueSlider = () => {
  const [vocabsDueToday, setVocabsDueToday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vocabs/due-today`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVocabsDueToday(response.data);
        console.log("Vocabularies due today:", response.data);
      } catch (error) {
        console.error("Failed to fetch vocabularies due today:", error);
      }
    };

    fetchData();
  }, []);

  const filterOverdue = vocabsDueToday.filter((vocab) => vocab.next_review < moment().format('YYYY-MM-DD'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <h1>Vocabularies OverDue</h1>
      <Slider {...settings}>
        {filterOverdue.map((vocab) => (
          <div className="special" key={vocab.id}>
            <h3>{vocab.front}</h3>
            <p style={{ color: vocab.status = 'needs review' ? 'red' : 'black' }}>{moment(vocab.next_review).isBefore(moment(), 'day') ? 'Needs Review' : 'Due Today'}</p>
            <p>{moment(vocab.next_review).format('YYYY-MM-DD')}</p>
            <p>G{vocab.box_id}</p>
            <Link to={`/vocab/${vocab.box_id}/${vocab.id}`} className="review-button">
              Review
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OverDueSlider;
