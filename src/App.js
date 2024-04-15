import './App.css';
// import BarChart from './BarChart'
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FCFS from './components/FCFS';
import SJN from './components/SJN';
import RR from './components/RR';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <LandingPage /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/fcfs" element={<FCFS />} />
          <Route path="/sjn" element={<SJN />} />
          <Route path="/rr" element={<RR />} />
        </Routes>


      </div>
    </Router>


  );
}

export default App;
