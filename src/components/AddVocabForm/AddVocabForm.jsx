import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddVocabForm.scss';
const moment = require('moment'); 

const AddVocabForm = ({ selectedLanguage }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get("http://localhost:3001/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, []);
    const handleAdd = async () => {
        if (front.trim() === '' || back.trim() === '') {
            alert('Front and back data cannot be empty!');
            return;
        }

        const currentTime = moment().format('YYYY-MM-DD');
        // const nextReviewTime = moment().add(1, 'day').format('YYYY-MM-DD'); // Add 1 day
        // console.log('Next review time:', nextReviewTime);
        const vocabData = {
            user_id: userData.id,
            box_id: 1,
            front,
            back,
            language: selectedLanguage,
            status: 'needs review',
            created_at: currentTime,
            reviewed_at: currentTime,
            next_review: currentTime
        };

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/add-vocab', vocabData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });

            console.log(response.data);
            //successfully added
            setFront('');
            setBack('');
        } catch (error) {
            console.error('Error adding vocab:', error);
        }
    };

    const handleReset = () => {
        setFront('');
        setBack('');
    };

    return (
        <div className="add-vocab-form">
            <h1>Add your new words</h1>
            <label className="form-label">Front:</label>
            <input className="form-input" type="text" value={front} onChange={e => setFront(e.target.value)} />
            <br />
            <label className="form-label">Back:</label>
            <textarea className="form-textarea" value={back} onChange={e => setBack(e.target.value)}></textarea>
            <br />
            <button className="form-button" onClick={handleAdd}>Add</button>
            <button className="form-button resetButton" onClick={handleReset}>Reset form</button>
        </div>
    );
};

export default AddVocabForm;
