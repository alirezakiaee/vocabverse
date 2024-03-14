import axios from 'axios';
import { useEffect, useState } from 'react';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
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
            {userName ? (
                <h1>Welcome, {userName}!</h1>
            ) : (
                <h1>Welcome, Guest!</h1>
            )}
            <LanguageSelector setLanguage={handleLanguageChange} />
            <WordGenerator language={selectedLanguage} /> 
        </div>
    );
}

export default Home;
