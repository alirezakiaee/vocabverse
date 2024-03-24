import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

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

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
