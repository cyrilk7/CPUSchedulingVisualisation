import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/modal.css";
import { useNavigate } from 'react-router-dom';

function ProcesssModal(props) {
    const [show, setShow] = useState(true);
    const { onClose, redirectPage } = props;
    const [numProcesses, setNumProcesses] = useState(1);
    const [quantum, setQuantum] = useState(1);
    const [processes, setProcesses] = useState([{ arrivalTime: 0, burstTime: 0 }]);
    const [showInputField, setShowInputField] = useState(false);
    const navigate = useNavigate();




    const handleNumProcessesChange = (e) => {
        const num = parseInt(e.target.value);
        setNumProcesses(num);
        setProcesses(Array(num).fill().map(() => ({ burstTime: 0, arrivalTime: 0 })));
    };


    const handleQuantumChange = (e) => {
        const num = parseInt(e.target.value);
        setNumProcesses(num);
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
        const isValid = processes.every(process => process.burstTime >= 1 && process.arrivalTime >= 1);
        if (isValid) {
            navigate(redirectPage, { state: { processes: processes } });
        } else {
            // Handle error, e.g., display a message to the user
            alert("Burst time and arrival time must be greater than or equal to 1.");
        }
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
                    <input
                        className='modal-input'
                        type="number"
                        value={numProcesses}
                        min="1"
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace') e.preventDefault();
                        }}
                        onChange={handleNumProcessesChange}
                    />

                    {showInputField && (
                        <input
                            className='modal-input'
                            type="number"
                            value={quantum}
                            min="1"
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace') e.preventDefault();
                            }}
                            onChange={handleQuantumChange}
                        />
                    )}
                    {Array.from({ length: numProcesses }).map((_, index) => (
                        <div key={index}>
                            <label className='modal-label'>
                                Burst Time for Process {index + 1}:
                            </label>
                            <br />
                            <input
                                className='modal-input'
                                type="number"
                                value={processes[index].burstTime}
                                min="1"
                                onChange={(e) => handleBurstTimeChange(e, index)}
                            />
                            <br />
                            <label className='modal-label'>
                                Arrival Time for Process {index + 1}:
                            </label>
                            <br />
                            <input
                                className='modal-input'
                                type="number"
                                value={processes[index].arrivalTime}
                                min="1"
                                onChange={(e) => handleArrivalTimeChange(e, index)}
                            />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='submit-process-btn' type="submit" disabled={numProcesses <= 0}>Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ProcesssModal;