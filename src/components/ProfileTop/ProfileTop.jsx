import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the 'Link' component
import profileImage from "../../assets/Icons/profile.png"; // Import the profile image
const ProfileTop = (props) => {
    return (
        <div>
            <Link to="/profile">
                <img src={profileImage} alt="profile" /> 
            </Link>
            {props.dataOfUser && <span> Welcome, {props.nameOfUser}</span>}
        </div>
    );
};

export default ProfileTop;
