import "bootstrap/dist/css/bootstrap.min.css"
import landingImage from '../images/landing-img.png';
import { Link } from 'react-scroll';
import Footer from "../components/Footer.js";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProcesssModal from "../components/ProcessModal.js";
import "../css/landing.css";


const redirectMap = {
    FCFS: "/fcfs",
    SJN: "/sjn",
    RR: "/rr",
    MLFQ: "/mlfq"
};

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentAlgorithm, setCurrentAlgorithm] = useState(null);

    


    const handleModalOpen = (process) => {
        setCurrentAlgorithm(process);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setCurrentAlgorithm(null);
        setShowModal(false);
    };

    return (
        <div className="main-landing">
            <div className="landing-container">
                <div className="left-landing">
                    <h1>CPU Scheduling <br /> & Visualisation Tool </h1>
                    <h5> The CPU Scheduling Visualization Tool aims to provide a user-friendly interface for visualizing and analyzing the execution of CPU scheduling algorithms. </h5>
                    <Link to="select-algo" smooth={true} duration={500}>
                        <button> Get Started </button>
                    </Link>
                </div>

                <div className="right-landing">
                    <img src={landingImage} alt="Logo" />

                </div>
            </div>

            <section id="select-algo">
                <h2> Select a Scheduling Algorithm </h2>
                <div className="algo-container">
                    <Button variant="primary" onClick={() => handleModalOpen("FCFS")}>
                        First Come First Serve
                    </Button>

                    <Button variant="primary" onClick={() => handleModalOpen("SJN")}>
                        Shortest Job Next
                    </Button>

                    <Button variant="primary" onClick={() => handleModalOpen("RR")}>
                        Round Robin
                    </Button>

                    <Button variant="primary" onClick={() => handleModalOpen("MLFQ")}>
                        MLF
                    </Button>



                </div>

                {showModal && (
                    <ProcesssModal
                        onClose={handleModalClose}
                        redirectPage={redirectMap[currentAlgorithm]}
                    />
                )}
                <Footer />


            </section>
        </div>
    );
}

export default LandingPage;