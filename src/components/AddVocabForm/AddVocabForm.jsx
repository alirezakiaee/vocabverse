import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddVocabForm.scss';
const moment = require('moment');

const AddVocabForm = ({ selectedLanguage }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showLanguageError, setShowLanguageError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
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

  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
  };

  const handleAdd = async () => {
    if (!selectedLanguage) {
      setShowLanguageError(true);
      return;
    }
    if (front.trim() === '' || back.trim() === '') {
      alert('Front and back data cannot be empty!');
      return;
    }

    const currentTime = moment().local().format('YYYY-MM-DD HH:mm:ss');
    debugger;
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-vocab`, vocabData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      console.log(response.data);
      //successfully added
      setFront('');
      setBack('');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding vocab:', error);
    }
  };

  const handleReset = () => {
    setFront('');
    setBack('');
  };

  return (
    <>
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
      <Modal
        isOpen={showLanguageError}
        style={customStyles}
        className="modal-content"
        onRequestClose={() => setShowLanguageError(false)}
      >
        <p>Please select a language first!</p>
        <button onClick={() => setShowLanguageError(false)}>Close</button>
      </Modal>
      <Modal
        isOpen={showSuccessModal}
        style={customStyles}
        contentLabel="Success"
        className="modal-content" // Add the new class here
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <h3>Vocab successfully added!</h3>
        <button onClick={() => setShowSuccessModal(false)}>Close</button>
      </Modal>
    </>
  );
};

export default AddVocabForm;
