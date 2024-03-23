import React, { useState, useCallback } from "react";
import axios from "axios";
import './WordGenerator.scss';
import moment from "moment";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function WordGenerator({ language, userData }) {
  const [words, setWords] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const handleAdd = async () => {
    if (words.length === 0 || !userData) {
      console.log("No user data");
      return;
    }

    const vocabDataArray = words.map((word) => {
      const parts = word.split(": ");
      const numberAndWord = parts[0].slice(3).trim();
      const meaning = parts[1];

      const currentTime = moment().format("YYYY-MM-DD");

      return {
        // user_id: userData.id,
        box_id: 1,
        front: numberAndWord,
        back: meaning,
        language: language,
        status: "needs review",
        created_at: currentTime,
        reviewed_at: currentTime,
        next_review: currentTime,
      };
    });
    
    try {
      const response = await axios.post(
        "http://localhost:3001/add-vocab-array",
        { words: vocabDataArray },
        { headers: getHeaders() }
        );
        
        console.log(response.data);
        setWords([]);
      } catch (error) {
        console.error("Error adding vocab:", error);
      }
    };

  const generateWords = useCallback(async () => {
    if (!language) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/gpt-call",
        { language },
        { headers: getHeaders() }
      );
      setWords(response.data.split("\n"));
      setShowButton(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="word-generator">
      <h1>OR</h1>
      {isLoading && (
        <LoaderContainer>
          <Oval color="#00BFFF" height={80} width={80} />
        </LoaderContainer>
      )}
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <p>Please select a language first.</p>
            <button className="popup" onClick={closeModal}>Close</button>
          </ModalContainer>
        </ModalBackground>
      )}
      {!isLoading && (
        <button className="generate-button" onClick={generateWords}>
          Let AI generate words for you!
        </button>
      )}
      {words.length > 0 && (
        <div className="word-container">
          <table className="word-table">
            <thead>
              <tr>
                <th>Word</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {words.map((word, index) => {
                const parts = word.split(": ");
                const numberAndWord = parts[0].slice(3).trim();
                const meaning = parts[1];

                return (
                  <tr key={index}>
                    <td>{numberAndWord}</td>
                    <td>{meaning}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showButton && <button className="learn-button" onClick={handleAdd}>Add them to Stack G1!</button>}
    </div>
  );
}

export default WordGenerator;


