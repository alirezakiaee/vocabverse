import React, { useState } from 'react';
import './LanguageSelector.scss';

function LanguageSelector({ setLanguage }) {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setSelectedLanguage(selectedLanguage);
        console.log(`Selected language: ${selectedLanguage}`); // Log the selected language
        setLanguage(selectedLanguage); // Pass selected language to the parent component
    };

    return (
        <div className="language-selector">
            <label htmlFor="learningLanguage" className="selector-label">You are learning:</label>
            <select
                id="learningLanguage"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="selector-select"
            >
                <option value="">Select a language</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                {/* Add more options as needed */}
            </select>
        </div>
    );
}

export default LanguageSelector;

