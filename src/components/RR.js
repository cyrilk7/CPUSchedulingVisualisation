import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
// import { select, scaleLinear } from "d3";
import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";




const RR = () => {
    const location = useLocation();
    let processes = location.state?.processes;

    // Assigning process ids to the processes
    for (let i = 0; i < processes.length; i++) {
        processes[i].id = i + 1;
    }
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let [queue, setQueue] = useState(processes);

    let result = [];
    let quantum = 3;
    let clock = 0;
    let runningQueue = [];
    let turnaroundTime = 0;

    // console.log(queue.length, "Queue Length");
    while (queue.length > 0 || runningQueue.length > 0) {
        // Check for new arrivals and add them to the running queue
        while (queue.length > 0 && queue[0].arrivalTime <= clock) {
            runningQueue.push(queue.shift());
        }

        if (runningQueue.length === 0) {
            clock++;
            continue;
        }

        let currentProcess = runningQueue.shift();
        let timeSlice = Math.min(currentProcess.burstTime, quantum);
        result.push({ process: currentProcess.id, time: timeSlice , clock: clock });
        currentProcess.burstTime -= timeSlice;
        clock += timeSlice;

        if (currentProcess.burstTime > 0) {
            runningQueue.push(currentProcess);
        }
    }

    console.log(result);

    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> First Come First Serve </h1>
                    <ProcessTable processes={processes} />
                </div>

                <div className="FCFS-top-right">
                    {/* <h2 className='timer'>Timer:  <span> {seconds} seconds </span> </h2> */}
                    <h4> Ready Queue </h4>
                    <div className="queue-container">
                        {/* <svg ref={svgRef} className="queue" width="700" height="450"></svg> */}
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

export default RR;