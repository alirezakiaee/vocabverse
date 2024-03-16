import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

        const currentTime = new Date();
        const mysqlFormat = currentTime.toISOString().replace(/T|Z/g, ' ');
        const nextReviewTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
        const nextReviewMysqlFormat = nextReviewTime.toISOString().replace(/T|Z/g, ' ');

        const vocabData = {
            user_id: userData.id,
            box_id: 1,
            front,
            back,
            language: selectedLanguage,
            status: 'needs review',
            created_at: mysqlFormat,
            reviewed_at: mysqlFormat,
            next_review: nextReviewMysqlFormat
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
        <div>
            <label>Front:</label>
            <input type="text" value={front} onChange={e => setFront(e.target.value)} />
            <br />
            <label>Back:</label>
            <textarea value={back} onChange={e => setBack(e.target.value)}></textarea>
            <br />
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleReset}>Reset form</button>
        </div>
    );
};

export default AddVocabForm;
