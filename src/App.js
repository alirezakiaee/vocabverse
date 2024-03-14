import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TenNewWords from './pages/TenNewWords/TenNewWords';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ten-new-words" element={<TenNewWords />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

