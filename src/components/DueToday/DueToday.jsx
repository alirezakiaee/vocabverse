import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Headers from "../../components/Header/Header";
import moment from "moment";
import "./DueToday.scss";

const DueToday = () => {
  const [vocabs, setVocabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/vocabs/due-today/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVocabs(response.data);
        console.log("Vocabularies:", response.data);
      } catch (error) {
        console.error("Failed to fetch vocabularies:", error);
      }
    };

    fetchData();
  }, []);

  const filterDueToday = vocabs.filter((vocab) =>
    moment(vocab.next_review).isSame(moment(), "day")
  );

  const filterOverdue = vocabs.filter((vocab) =>
    moment(vocab.next_review).isBefore(moment(), "day")
  );

  const sendEmail = async () => {
    const dueTodayTable = document.querySelector(".duetoday");
    const overdueTable = document.querySelector(".overdue");

    const dueTodayRows = dueTodayTable.querySelectorAll("tbody tr");
    const overdueRows = overdueTable.querySelectorAll("tbody tr");

    let message = "";

    message += "<h3>Vocabularies Due Today</h3>";
    message += "<table border='1' cellpadding='5' cellspacing='0'>";
    message += "<tr><th>Front</th><th>Status</th><th>Next Review</th><th>Box</th><th>Language</th><th>Actions</th></tr>";
    for (const row of dueTodayRows) {
      message += "<tr>";
      for (const cell of row.cells) {
        message += `<td>${cell.innerText}</td>`;
      }
      message += "</tr>";
    }
    message += "</table>";

    message += "<h3>Vocabularies Overdue</h3>";
    message += "<table border='1' cellpadding='5' cellspacing='0'>";
    message += "<tr><th>Front</th><th>Status</th><th>Next Review</th><th>Box</th><th>Language</th><th>Actions</th></tr>";
    for (const row of overdueRows) {
      message += "<tr>";
      for (const cell of row.cells) {
        message += `<td>${cell.innerText}</td>`;
      }
      message += "</tr>";
    }
    message += "</table>";

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/send-email`,
        {
          name: "Vocab Reminder",
          email: "alirezakiaee91@gmail.com",
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <div className="container-all">
      <Headers />
      <div className="container-inner">
        <h1>Vocabularies Due Today</h1>
        <table className="duetoday">
          <thead>
            <tr>
              <th>Front</th>
              <th>Status</th>
              <th>Next Review</th>
              <th>Box</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterDueToday.map((vocab) => (
              <tr key={vocab.id}>
                <td>{vocab.front}</td>
                <td style={{ color: vocab.status = "needs review" ? "red" : "black" }}>{moment(vocab.next_review).isSame(moment(), 'day') ? 'Needs Review' : 'Due Today'}</td>
                <td>{moment(vocab.next_review).format("YYYY-MM-DD")}</td>
                <td>G{vocab.box_id}</td>
                <td>{vocab.language}</td>
                <td>
                  <Link
                    to={`/vocab/${vocab.box_id}/${vocab.id}`}
                    className="review-button"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Vocabularies Overdue</h1>
        <table className="overdue">
          <thead>
            <tr>
              <th>Front</th>
              <th>Status</th>
              <th>Next Review</th>
              <th>Box</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterOverdue.map((vocab) => (
              <tr key={vocab.id}>
                <td>{vocab.front}</td>
                <td style={{ color: vocab.status = 'needs review' ? 'red' : 'black' }}>{moment(vocab.next_review).isBefore(moment(), 'day') ? 'Needs Review' : 'Due Today'}</td>
                <td>{moment(vocab.next_review).format('YYYY-MM-DD')}</td>
                <td>G{vocab.box_id}</td>
                <td>{vocab.language}</td>
                <td>
                  <Link to={`/vocab/${vocab.box_id}/${vocab.id}`} className="review-button">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="sendEmail" onClick={sendEmail}>Send as Email</button>
      </div>
    </div>
  );
};

export default DueToday;

