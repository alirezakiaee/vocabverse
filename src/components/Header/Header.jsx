// import React, { useState , useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Header = (props) => {
//   const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             axios.get("http://localhost:3001/profile", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             .then((response) => {
//                 setUserData(response.data.user); // structure of the response is { user: { name, email, profileImage } }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//         }
//     }, []); // replace with actual user data

//   console.log(`Selected language: ${userData.id}`);

//   return (
//     <div className="header">
//       <Link to="/home"><img src="home_image_url" alt="home" /></Link>
//       <Link to="/settings"><img src="settings_image_url" alt="settings" /></Link>
//       <Link to="/profile"><img src="profile_image_url" alt="profile" /></Link>
//       <span>{userData.id}</span>
//     </div>
//   );
// }

// export default Header;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = (props) => {
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

  // Check if userData is null before accessing its properties
  const selectedLanguage = userData ? userData.name : '';

  return (
    <div className="header">
      <Link to="/home"><img src="home_image_url" alt="home" /></Link>
      <Link to="/settings"><img src="settings_image_url" alt="settings" /></Link>
      <Link to="/profile"><img src="profile_image_url" alt="profile" /></Link>
      {/* Display userData.id only if userData exists */}
      {userData && <span>welcome {selectedLanguage}</span>}
    </div>
  );
}

export default Header;
