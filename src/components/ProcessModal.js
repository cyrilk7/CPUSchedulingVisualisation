import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/modal.css";
import { useNavigate } from 'react-router-dom';
import { get } from 'react-scroll/modules/mixins/scroller';
// import 'bootstrap/dist/css/bootstrap.min.css';


function ProcesssModal(props) {
    const [show, setShow] = useState(true);
    const [numProcesses, setNumProcesses] = useState(1);
    const [processes, setProcesses] = useState([{ arrivalTime: 0, burstTime: 0 }]);
    const navigate = useNavigate();


    const handleNumProcessesChange = (e) => {
        const num = parseInt(e.target.value);
        setNumProcesses(num);
        setProcesses(Array(num).fill().map(() => ({ burstTime: 0, arrivalTime: 0 })));
    };

    const handleBurstTimeChange = (e, index) => {
        const newProcesses = [...processes];
        newProcesses[index].burstTime = parseInt(e.target.value);
        setProcesses(newProcesses);
    };

    const handleArrivalTimeChange = (e, index) => {
        const newProcesses = [...processes];
        newProcesses[index].arrivalTime = parseInt(e.target.value);
        setProcesses(newProcesses);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the data here (e.g., simulation)
        // console.log(processes);
        navigate('/fcfs', { state: { processes: processes } });
    };


    const handleClose = () => {
        setShow(false);
        props.onClose();
    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className='modal-h1'> Processes </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>

                    <label className='modal-label'>
                        Number of Processes
                    </label>
                    <br />
                    <input className='modal-input' type="number" value={numProcesses} min="1" onChange={handleNumProcessesChange} />
                    {Array.from({ length: numProcesses }).map((_, index) => (
                        <div key={index}>
                            <label className='modal-label'>
                                Burst Time for Process {index + 1}:
                            </label>
                            <br />
                            <input className='modal-input' type="number" value={processes[index].burstTime} onChange={(e) => handleBurstTimeChange(e, index)} />
                            <br />
                            <label className='modal-label'>
                                Arrival Time for Process {index + 1}:
                            </label>
                            <br />
                            <input className='modal-input' type="number" value={processes[index].arrivalTime} onChange={(e) => handleArrivalTimeChange(e, index)} />
                        </div>
                    ))}
                    


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='submit-process-btn' type="submit">Submit</button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </form>
        </Modal>
        // </>
    );
}

export default ProcesssModal;