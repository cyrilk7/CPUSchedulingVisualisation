import './App.css';
// import BarChart from './BarChart'
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FCFS from './components/FCFS';
import SJN from './components/SJN';
import RR from './components/RR';
import MLFQ from './components/MLFQ';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/fcfs" element={<FCFS />} />
          <Route path="/sjn" element={<SJN />} />
          <Route path="/rr" element={<RR />} />
          <Route path="/mlfq" element={<MLFQ />} /> 
        </Routes>


      </div>
    </Router>


  );
}

export default App;
