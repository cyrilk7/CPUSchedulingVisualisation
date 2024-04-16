import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
// import { select, scaleLinear } from "d3";
import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";




const SJN = () => {
    const location = useLocation();
    let processes = location.state?.processes;
    
    // assigning process ids to the processes
    for (let i = 0; i < processes.length; i++) {
        processes[i].index = i;
    }
    
    const sortedProcesses = processes.slice().sort((a, b) => a.arrivalTime - b.arrivalTime);

    // State for result and clock
    const [result, setResult] = useState([]);
    const clock = useRef(0);
    
    const minHeap = useRef(new MinHeap());
    const svgRef = useRef(null)

    useEffect(() => {
        const runScheduler = () => {
            let queue = [...sortedProcesses];

            while (queue.length > 0 || minHeap.current.length() > 0) {
                while (queue.length > 0 && queue[0].arrivalTime <= clock.current) {
                    const process = queue.shift();
                    minHeap.current.add(process);
                }

                if (minHeap.current.length() === 0) {
                    clock.current++;
                    continue;
                }

                const currentProcess = minHeap.current.peek();
                const updatedProcess = { ...currentProcess, burstTime: currentProcess.burstTime - 1 };

                if (updatedProcess.burstTime === 0) {
                    // Process completed
                    minHeap.current.remove();
                    setResult((prevResult) => [...prevResult, { process: currentProcess.id, time: 1, clock: clock.current }]);
                } else {
                    // Process still running
                    minHeap.current.remove(); // Remove old process
                    minHeap.current.add(updatedProcess); // Reinsert updated process
                    setResult((prevResult) => [...prevResult, { process: currentProcess.id, time: 1, clock: clock.current }]);
                }

                clock.current++;
            }
        };

        runScheduler();
    }, []); 
    

    console.log(result);




    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> Shortest Job Next </h1>
                    <ProcessTable processes={processes} />
                </div>

                <div className="FCFS-top-right">
                    {/* <h2 className='timer'>Timer:  <span> {seconds} seconds </span> </h2> */}
                    <h4> Ready Queue </h4>
                    <div className="queue-container">
                        <svg ref={svgRef} className="queue" width="700" height="150"></svg>
                    </div>

                </div>
            </div>
            <div className="FCFS-bottom">
                <div className="gantt-box">
                    {/* <svg id='ganttChartContainer' ref={ganttRef} className="queue" width="700" height="450"></svg> */}
                </div>
            </div>

        </div>
    );
}

export default SJN;