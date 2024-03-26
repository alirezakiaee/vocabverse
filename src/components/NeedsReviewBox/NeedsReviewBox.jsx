import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NeedsReviewBox.scss';
import moment from 'moment';

const NeedsReviewBox = ({ box_id }) => {
  const [vocabList, setVocabList] = useState([]);

  useEffect(() => {
    const fetchVocabList = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/vocabs/${box_id}/needs-review/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedVocabList = response.data.map((vocab) => {
          if (moment(vocab.next_review).isSameOrBefore(moment())) {
            return { ...vocab, status: 'needs review' };
          }
          return vocab;
        });
        setVocabList(updatedVocabList);
      } catch (error) {
        console.error('Error fetching vocab list:', error);
      }
    };

    fetchVocabList();
  }, [box_id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/vocabs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVocabList((prevVocabList) => prevVocabList.filter((vocab) => vocab.id !== id));
    } catch (error) {
      console.error('Error deleting vocabulary:', error);
    }
  };
  return (
    <div className="needs-review-box">
      <h2>Vocabularies Needing Review</h2>
      <table>
        <thead>
          <tr>
            <th>Front</th>
            <th>Status</th>
            <th>Next Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vocabList.map((vocab) => (
            <tr key={vocab.id}>
              <td>{vocab.front}</td>
              <td style={{ color: vocab.status === 'needs review' ? 'red' : 'black' }}>{vocab.status}</td>
              <td>{moment(vocab.next_review).format('YYYY-MM-DD')}</td>
              <td>
                <Link to={`/vocab/${box_id}/${vocab.id}`} className="review-button">
                  Review
                </Link>
                <button onClick={() => handleDelete(vocab.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NeedsReviewBox;
