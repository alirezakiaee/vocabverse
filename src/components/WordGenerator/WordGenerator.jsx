import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function WordGenerator({ language }) {
  const [words, setWords] = useState([]);

  const generateWords = useCallback(async () => {
    if (!language) return;
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      console.log(language);
      const response = await axios.post("http://localhost:3001/gpt-call", {language}, {
          headers: headers
        })
      console.log(response);
      // const generatedWordsString = response.data.choices[0].text;
      const generatedWordsArray = response.data.split(", ");
        console.log(generatedWordsArray);
      setWords(generatedWordsArray);
    } catch (error) {
      console.error(error);
    }
  }, [language]);

  useEffect(() => {
    generateWords();
  }, [generateWords]);

  return (
    <div>
      <h2>Your 10 new {language} words:</h2>
      {words.map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
}

export default WordGenerator;
