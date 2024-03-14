import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: props.name }; // replace with actual user data
  }

  render() {
    return (
      <div className="header">
        <Link to="/home"><img src="home_image_url" alt="home" /></Link>
        <Link to="/settings"><img src="settings_image_url" alt="settings" /></Link>
        <Link to="/profile"><img src="profile_image_url" alt="profile" /></Link>
        <span>{this.state.userId}</span>
      </div>
    );
  }
}

export default Header;