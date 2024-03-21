import React, { useState, useCallback } from "react";
import axios from "axios";
import './WordGenerator.scss';

function WordGenerator({ language, userData }) {
  const [words, setWords] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const generateWords = useCallback(async () => {
    if (!language) return;
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://localhost:3001/gpt-call",
        { language },
        {
          headers: headers,
        }
      );
      const generatedWordsArray = response.data.split("\n");
      setWords(generatedWordsArray);
      setShowButton(true);
    } catch (error) {
      console.error(error);
    }
  }, [language]);

  const handleAdd = async () => {
    if (words.length === 0 || !userData) {
      console.log("No user data");
      return;
    }

    const vocabDataArray = words.map((word) => {
      const parts = word.split(": ");
      const numberAndWord = parts[0].slice(3).trim();
      const meaning = parts[1];

      const currentTime = new Date();
      const mysqlFormat = currentTime.toISOString().replace(/T|Z/g, " ");
      const nextReviewTime = new Date(
        currentTime.getTime() + 24 * 60 * 60 * 1000
      );
      const nextReviewMysqlFormat = nextReviewTime
        .toISOString()
        .replace(/T|Z/g, " ");

      return {
        // user_id: userData.id,
        box_id: 1,
        front: numberAndWord,
        back: meaning,
        language: language,
        status: "needs review",
        created_at: mysqlFormat,
        reviewed_at: mysqlFormat,
        next_review: nextReviewMysqlFormat,
      };
    });

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3001/add-vocab-array",
        {
          words: vocabDataArray,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log(response.data);
      setWords([]);
      setShowButton(false);
    } catch (error) {
      console.error("Error adding vocab:", error);
    }
  };

  return (
    <div className="word-generator">
    <button className="generate-button" onClick={generateWords}>I want AI to show me words!</button>
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
    {showButton && <button className="learn-button" onClick={handleAdd}>Let's learn em!</button>}
  </div>
  );
}

export default WordGenerator;
