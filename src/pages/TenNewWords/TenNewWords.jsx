import axios from 'axios';
import { useEffect, useState } from 'react';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import Header from '../../components/Header/Header';
import AddVocabForm from '../../components/AddVocabForm/AddVocabForm';
import WordGenerator from '../../components/WordGenerator/WordGenerator';

function Home() {
    const [userName, setUserName] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get("http://localhost:3001/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
        <div>
            <Header name ={userName} />
            <LanguageSelector setLanguage={handleLanguageChange} />
            <AddVocabForm selectedLanguage={selectedLanguage} />
            <WordGenerator language={selectedLanguage} userData={userName}/> 
        </div>
    );
}

export default Home;
