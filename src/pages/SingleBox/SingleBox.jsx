import React, { useState, useEffect } from 'react';
import NeedsReviewBox from '../../components/NeedsReviewBox/NeedsReviewBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';

const SingleBox = () => {
  const { box_id } = useParams();
  const [boxName, setBoxName] = useState('');

  useEffect(() => {
    const fetchBoxName = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
        const response = await axios.get(`http://localhost:3001/boxes/${box_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in request headers
          },
        });
        setBoxName(response.data.name);
      } catch (error) {
        console.error('Error fetching box name:', error);
      }
    };

    fetchBoxName();
  }, [box_id]);

  return (
    <div>
      <Header />
      <h2>{boxName ? boxName : 'Loading...'}</h2>
      <NeedsReviewBox box_id={box_id} />
    </div>
  );
};

export default SingleBox;
