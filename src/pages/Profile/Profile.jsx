import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Profile() {
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
                setUserData(response.data.user); // structure of the response is { user: { name, email, profileImage } }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, []);

    return (
        <div>
            <Header />
            <svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> 
            {userData && (
                <div>
                    <img src={userData.profileImage} alt="Profile" />
                    <h2>{userData.name}</h2>
                    <p>{userData.email}</p>
                </div>
            )}
            <Link to="/home">
                <button>Go to Home</button>
            </Link>
            <Link to="/settings">
                <button>Go to Settings</button>
            </Link>
        </div>
    );
}

export default Profile;
