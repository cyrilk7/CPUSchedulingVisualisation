import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";

const SJN = () => {
    const location = useLocation();
    let processes = location.state?.processes;

    // Create a copy of the processes array
    processes = processes.map((process, index) => ({
        ...process,
        index: index + 1
    }));
    
    let processesCopy = [...processes];

    // Assigning process indexs to the processes
    processesCopy = processesCopy.map((process, index) => ({
        ...process,
        index: index + 1
    }));

    processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Create a clone of the processes array to work with
    let queue = [...processesCopy];

    //minHeap initialization
    let minHeap = new MinHeap();
    let result = [];
    let time = 0;
    let prev_running_process = null;

    //algorithm to run SJN
    let clock = 0;
    let completionTimes = {}; // Dictionary to store completion times

    while (queue.length > 0 || minHeap.length() > 0) {
        while (queue.length > 0 && queue[0].arrivalTime <= clock) {
            minHeap.add(queue.shift());
        }

        if (minHeap.length() === 0) {
            clock++;
            continue;
        }

        let currentProcess = minHeap.peek();
        
        // if (prev_running_process 1)
        if (currentProcess.index !== prev_running_process && prev_running_process !== null) {
            result.push({ process: prev_running_process, time: time, clock: clock });
            prev_running_process = currentProcess.index;
            time = 1;
        } else {
            prev_running_process = currentProcess.index;
            time++;
        }

        currentProcess.burstTime--;
        if (currentProcess.burstTime === 0) {

            minHeap.remove();
        }

        clock++;
        completionTimes[currentProcess.index] = clock;
    }
    result.push({ process: prev_running_process, time: time, clock: clock });

    console.log(result);
    console.log(completionTimes);
    console.log(processes, "Processes");
    console.log(processesCopy, "Processes Copy");


    // Generate the Gantt chart HTML
    const ganttChartHTML = result.map(({ process, time, clock }, index) => (
        <div key={index} className="gantt-block" style={{ width: `${time * 20}px` }}>
            {`P${process}`}<br />{clock}
        </div>
    ));

    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> Shortest Job First </h1>
                    <ProcessTable processes={processes} compTimes={completionTimes} />
                </div>
                <div className="FCFS-top-right">
                    <h4> Ready Queue </h4>
                    <div className="queue-container"></div>
                </div>
            </div>
            <div className="FCFS-bottom">
                <div className="gantt-box">{ganttChartHTML}</div>
            </div>
        </div>
    );
}

export default SJN;

