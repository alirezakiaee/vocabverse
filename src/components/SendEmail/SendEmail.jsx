import React, { useState } from "react";
import axios from "axios";

const SendEmail = ({ dueTodayTableData, overdueTableData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tableData = `
      <h3>Vocabularies Due Today</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Front</th>
            <th>Status</th>
            <th>Next Review</th>
            <th>Box</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          ${dueTodayTableData
            .map(
              (vocab) => `
            <tr>
              <td>${vocab.front}</td>
              <td>${vocab.status}</td>
              <td>${vocab.next_review}</td>
              <td>G${vocab.box_id}</td>
              <td>${vocab.language}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h3>Vocabularies Overdue</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Front</th>
            <th>Status</th>
            <th>Next Review</th>
            <th>Box</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          ${overdueTableData
            .map(
              (vocab) => `
            <tr>
              <td>${vocab.front}</td>
              <td>${vocab.status}</td>
              <td>${vocab.next_review}</td>
              <td>G${vocab.box_id}</td>
              <td>${vocab.language}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const newEmail = {
      name,
      email,
      message: message + "\n\n" + tableData,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/send-email",
        newEmail
      );
      if (response.status === 200) {
        setSuccessMessage("Email sent successfully!");
        // Clear form fields
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "An error occurred while sending the email: " + error.response.data
        );
      } else {
        setErrorMessage("An error occurred while sending the email.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send Email</button>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default SendEmail;
