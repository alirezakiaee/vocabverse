import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OverDue = () => {
  const [vocabsDueToday, setVocabsDueToday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get("http://localhost:3001/vocabs/due-today", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVocabsDueToday(response.data);
        console.log("Vocabularies due today:", response.data);
      } catch (error) {
        console.error("Failed to fetch vocabularies due today:", error);
      }
    };

    fetchData();
  }, []);
  
  const filterOverdue = vocabsDueToday.filter((vocab) => vocab.next_review <= new Date().toISOString().slice(0, 10));
  // const sortByNextReview = [...filterDueToday, ...filterOverdue].sort((a, b) => new Date(a.next_review) - new Date(b.next_review));
  return (
    <div>
      <h1>Vocabularies OverDue</h1>
      <table>
        <thead>
          <tr>
            <th>Front</th>
            <th>Status</th>
            <th>Next Review</th>
            <th>Box</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterOverdue.map((vocab) => (
            <tr key={vocab.id}>
              <td>{vocab.front}</td>
              <td>{vocab.status}</td>
              <td>{vocab.next_review}</td>
              <td>G{vocab.box_id}</td>
              <td>
                <Link to={`/vocab/${vocab.box_id}/${vocab.id}`} className="review-button">
                  Review
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverDue;