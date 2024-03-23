import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import "./SingleVocab.scss";
import moment from "moment";

const SingleVocab = () => {
  const { id, box_id } = useParams();
  const [vocab, setVocab] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [nextVocabId, setNextVocabId] = useState(null);
  const [vocabList, setVocabList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(typeof id, "id");
    const fetchVocab = async () => {
      try {
        const token = localStorage.getItem("token");
        let vocabId = id;

        if (nextVocabId !== null) {
          vocabId = nextVocabId;
          setNextVocabId(null);
        }

        const response = await axios.get(
          `http://localhost:3001/vocabs/${vocabId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVocab(response.data);
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };
    const fetchVocabList = async () => {
      const userId = localStorage.getItem("user_id"); // Replace with actual userId
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/vocabs/${box_id}/needs-review/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVocabList(response.data);
      } catch (error) {
        console.error("Error fetching vocab list:", error);
      }
    };
    fetchVocab();
    fetchVocabList();
  }, [id, nextVocabId, box_id]);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleRemembered = () => {
    // Update the current vocabulary record
    const updatedVocab = { ...vocab };
    updatedVocab.reviewed_at = formatDateForMySQL(new Date());
    updatedVocab.status = "reviewed on time";

    // Update next_review based on box_id
    const box_id = parseInt(updatedVocab.box_id, 10);
    const daysToAdd = [0, 1, 2, 4, 8, 16][box_id];
    const nextReviewDate = new Date(updatedVocab.next_review);
    nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);
    updatedVocab.next_review = formatDateForMySQL(nextReviewDate);

    // Increase box_id (maximum is 6)
    updatedVocab.box_id = Math.min(box_id + 1, 6);

    axios
      .put(`http://localhost:3001/vocabs/${id}`, updatedVocab, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Vocabulary updated:", response.data);

        let currentVocabIndex = vocabList.findIndex(
          (word) => word.id === Number(id)
        );

        let previousWord = vocabList[currentVocabIndex - 1];
        let nextWord = vocabList[currentVocabIndex + 1];
        console.log(previousWord, "previous");
        console.log(nextWord, "next");
        console.log(currentVocabIndex, "current");
        window.alert("Vocabulary remembered");
        if (previousWord) {
          console.log("navigating previous");
          navigate(`/vocab/${box_id}/${previousWord.id}`);
        }
        if (!previousWord && nextWord) {
          //send to next word in the box
          console.log("navigating next");
          navigate(`/vocab/${box_id}/${nextWord.id}`);
        }

        if (!previousWord && !nextWord) {
          //send to main G box
          console.log("no previous and next word left, navigating singlebox");
          navigate(`/singlebox/${box_id}`);
        }
        // Fetch the next vocabulary record from the previous box
      })
      .catch((error) => {
        console.error("Error updating vocabulary:", error);
      });
  };

  const handleDidntRemember = () => {
    // Update the current vocabulary record
    const updatedVocab = { ...vocab };
    updatedVocab.reviewed_at = formatDateForMySQL(new Date());
    updatedVocab.status = "needs review";
    updatedVocab.box_id = 1;
    const nextReviewDate = new Date(updatedVocab.next_review);
    nextReviewDate.setDate(nextReviewDate.getDate() + 1);
    updatedVocab.next_review = formatDateForMySQL(nextReviewDate);

    axios
      .put(`http://localhost:3001/vocabs/${id}`, updatedVocab, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Vocabulary updated:", response.data);

        let currentVocabIndex = vocabList.findIndex(
          (word) => word.id === Number(id)
        );

        let previousWord = vocabList[currentVocabIndex - 1];
        let nextWord = vocabList[currentVocabIndex + 1];
        console.log(previousWord, "previous");
        console.log(nextWord, "next");
        console.log(currentVocabIndex, "current");
        window.alert("No problem, review it again!");
        if (previousWord) {
          console.log("navigating previous");
          navigate(`/vocab/${box_id}/${previousWord.id}`);
        }
        if (!previousWord && nextWord) {
          //send to next word in the box
          console.log("navigating next");
          navigate(`/vocab/${box_id}/${nextWord.id}`);
        }

        if (!previousWord && !nextWord) {
          //send to main G box
          console.log("navigating singlebox");
          navigate(`/singlebox/${box_id}`);
        }
        // Fetch the next vocabulary record from the previous box
      })
      .catch((error) => {
        console.error("Error updating vocabulary:", error);
      });
  };

  const formatDateForMySQL = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  return (
    <div className="container-all">
      <Header />
      <div className="container-inner">
        <div className="single-vocab-container">
          <div className="single-vocab">
            {vocab && (
              <div className="carousel-container">
                <p className="carousel-text">Box : G{vocab.box_id}</p>
                <h1 className="carousel-text">{vocab.front}</h1>
                {showAnswer && <h2 className="carousel-text">{vocab.back}</h2>}
                <button className="carousel-button" onClick={handleShowAnswer}>
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                <div>
                  <button
                    className="carousel-button carousel-button-green"
                    onClick={handleRemembered}
                  >
                    I remembered
                  </button>
                  <button
                    className="carousel-button carousel-button-red"
                    onClick={handleDidntRemember}
                  >
                    I didn't remember
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVocab;
