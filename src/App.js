import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TenNewWords from './pages/TenNewWords/TenNewWords';
import AddVocabForm from './components/AddVocabForm/AddVocabForm';
import SingleBox from './pages/SingleBox/SingleBox'; 
import SingleVocab from './pages/SingleVocab/SingleVocab';
import DueToday from './components/DueToday/DueToday';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ten-new-words" element={<TenNewWords />} />
        <Route path="/add-vocab" element={<AddVocabForm />} />
        <Route path="/singlebox/:box_id" element={<SingleBox />} /> 
        <Route path="/vocab/:box_id/:id" element={<SingleVocab />} />
        <Route path="/due-today/" element={<DueToday />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
