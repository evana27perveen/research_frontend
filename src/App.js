
import './App.css';
import Login from './Components/AuthScreens/Login';
import Signup from './Components/AuthScreens/Signup';
import Home from './Components/HomeScreen/Home';
import AddNew from './Components/ResearchPaper/AddNew';
import ResearcherProfile from './Components/ProfileScreens/ResearcherProfile';
import ResearcherProfileDisplay from './Components/ProfileScreens/ResearcherProfileDisplay';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-new" element={<AddNew />} />
          <Route path="/researcher-profile" element={<ResearcherProfile />} />
          <Route path="/researcher-profile-display" element={<ResearcherProfileDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
