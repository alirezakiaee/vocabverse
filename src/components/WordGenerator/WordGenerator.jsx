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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log(language);
      const response = await axios.post(
        "http://localhost:3001/gpt-call",
        { language },
        {
          headers: headers,
        }
      );
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
    // <div>
    //   <h2>Your 10 new {language} words:</h2>
    //   {words.map((word, index) => (
    //     <p key={index}>{word}</p>
    //   ))}
    // </div>
<div>
  {words.map((word, index) => {
    const parts = word.split(': '); // Splitting by colon followed by space
    const numberAndNewWord = parts.shift(); // Extracting the number and new word
    const meaning = parts.join(': '); // Joining the remaining parts as the meaning
    
    return (
      <div key={index}>
        <h3>{numberAndNewWord}</h3>
        <p>{meaning}</p>
      </div>
    );
  })}
</div>






  );
}

export default WordGenerator;
