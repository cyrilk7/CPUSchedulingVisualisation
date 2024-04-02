import './App.css';
// import BarChart from './BarChart'
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FCFS from './components/FCFS';
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
        </Routes>


      </div>
    </Router>


  );
}

export default App;
