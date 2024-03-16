// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const NeedsReviewBox = ({ box_id }) => {
//   const [vocabList, setVocabList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
//         const response = await axios.get(
//           `http://localhost:3001/vocabs/${box_id}/needs-review`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include JWT token in request headers
//             },
//           }
//         );
//         setVocabList(response.data);
//       } catch (error) {
//         console.error("Error fetching vocab list:", error);
//       }
//     };

//     fetchData();
//   }, [box_id]);

//   return (
//     <div>
//       <h2>Vocabularies Needing Review</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Front</th>
//             <th>Status</th>
//             <th>Next Review</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vocabList.map((vocab) => (
//             <tr key={vocab.id}>
//               <td>{vocab.front}</td>
//               <td>{vocab.status}</td>
//               <td>{vocab.next_review}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NeedsReviewBox;
// NeedsReviewBox.jsx
// NeedsReviewBox.jsx
//--------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NeedsReviewBox = ({ box_id }) => {
  const [vocabList, setVocabList] = useState([]);

  useEffect(() => {
    const fetchVocabList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/vocabs/${box_id}/needs-review`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVocabList(response.data);
      } catch (error) {
        console.error('Error fetching vocab list:', error);
      }
    };

    fetchVocabList();
  }, [box_id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/vocabs/${id}`, {
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
    <div>
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
              <td>{vocab.status}</td>
              <td>{vocab.next_review}</td>
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
