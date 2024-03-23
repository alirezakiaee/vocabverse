import axios from "axios";
import { useEffect, useState } from "react";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import Header from "../../components/Header/Header";
import AddVocabForm from "../../components/AddVocabForm/AddVocabForm";
import WordGenerator from "../../components/WordGenerator/WordGenerator";
import "./TenNewWords.scss";

function Home() {
  const [userName, setUserName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { name } = response.data.user;
          setUserName(name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // Update the selected language state
  };

  return (
    <div className="container-all">
        <Header name={userName} />
      <div className="container-inner">
        <div className="word-generation__inner">
          <div className="inner-top">
            <LanguageSelector setLanguage={handleLanguageChange} />
          </div>
          <div className="inner-bottom">
            <AddVocabForm selectedLanguage={selectedLanguage} />
            <WordGenerator language={selectedLanguage} userData={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
