// import { useLocation } from 'react-router-dom';
// import ProcessTable from '../components/ProcessTable';
// import { useState } from "react";
// import "../css/ganttChart.css"; // Import CSS for styling the Gantt chart

// const MLFQ = () => {
//     const location = useLocation();
//     let processes = location.state?.processes;

//     // Assigning process ids to the processes
//     processes = processes.map((process, index) => ({
//         ...process,
//         id: index + 1,
//         priority: 0 // Initial priority for all processes
//     }));

//     // Define the number of queues and their time quantum
//     const numQueues = 3;
//     const timeQuantums = [8, 16, 32]; // Time quantums for each queue

//     let queues = Array.from({ length: numQueues }, () => []);

//     let clock = 0; // Initialize the clock at 0
//     let completionTimes = {}; // Dictionary to store completion times
//     let results = []; // Array to store results for each queue

//     // Function to find the appropriate queue for a process based on its priority
//     const findQueue = (priority) => {
//         if (priority >= 0 && priority < numQueues) {
//             return priority;
//         } else {
//             return numQueues - 1; // If priority is out of range, assign to the lowest priority queue
//         }
//     };

//     while (processes.length > 0) {
//         let currentProcess = { ...processes.shift() };

//         // Find the appropriate queue for the current process based on its priority
//         let queueIndex = findQueue(currentProcess.priority);

//         // Execute the process for its time quantum
//         let executeTime = Math.min(timeQuantums[queueIndex], currentProcess.burstTime);
//         currentProcess.burstTime -= executeTime;
//         clock += executeTime;

//         // Update the completion time for the process if it finishes
//         if (currentProcess.burstTime <= 0) {
//             completionTimes[currentProcess.id] = clock;
//         } else {
//             // If the process doesn't finish, demote its priority
//             currentProcess.priority++;
//         }

//         // Push the process back to the appropriate queue
//         queues[queueIndex].push({ ...currentProcess, time: executeTime });

//         // Rotate the queues (optional, depends on MLFQ implementation)
//         queues.push(queues.shift());
//     }

//     // Store the execution sequence of each queue in the results array
//     for (let queue of queues) {
//         let queueResult = [];
//         let prevClock = 0;
//         for (let process of queue) {
//             queueResult.push({ process: process.id, time: process.time, clock: prevClock });
//             prevClock += process.time;
//         }
//         results.push(queueResult);
//     }

//     console.log(completionTimes);
//     console.log(results);

//     // Generate the Gantt chart HTML
//     const ganttChartHTML = results.map((queueResult, queueIndex) => (
//         <div key={queueIndex} className="gantt-box">
//             {queueResult.map(({ process, time, clock }, index) => (
//                 <div key={index} className="gantt-block" style={{ width: `${time * 20}px` }}>
//                     {`P${process}`}<br />{clock}
//                 </div>
//             ))}
//         </div>
//     ));

//     return(
//         <div className='FCFS-container'>
//             <div className="FCFS-top">
//                 <div className="FCFS-top-left">
//                     <h1> MultiLevel Feedback </h1>
//                     <ProcessTable processes={processes} compTimes={completionTimes} />
//                 </div>
//                 <div className="FCFS-top-right">
//                     <h4> Ready Queue </h4>
//                     <div className="queue-container"></div>
//                 </div>
//             </div>
//             <div className="FCFS-bottom">
//                 <div className="gantt-box">{ganttChartHTML}</div>
//             </div>
//         </div>
//     );
// }

// export default MLFQ;




// import { useLocation } from 'react-router-dom';
// import ProcessTable from '../components/ProcessTable';
// import { useState } from "react";
// import "../css/ganttChart.css"; // Import CSS for styling the Gantt chart

// const MLFQ = () => {
//     const location = useLocation();
//     let processes = location.state?.processes;
//     console.log(processes, "Processes");

//     // Assigning process ids to the processes
//     processes = processes.map((process, index) => ({
//         ...process,
//         id: index + 1,
//         priority: 0 // Initial priority for all processes
//     }));

//     console.log(processes, "Processes");

//     // Define the number of queues and their time quantum
//     const numQueues = 3;
//     const timeQuantums = [8, 15, Infinity]; // Time quantums for each queue

//     let queues = Array.from({ length: numQueues }, () => []);

//     let clock = 0; // Initialize the clock at 0
//     let completionTimes = {}; // Dictionary to store completion times
//     let results = []; // Array to store results for each queue

//     // Function to find the appropriate queue for a process based on its priority
//     const findQueue = (priority) => {
//         if (priority >= 0 && priority < numQueues) {
//             return priority;
//         } else {
//             return numQueues - 1; // If priority is out of range, assign to the lowest priority queue
//         }
//     };

//     const boostTime = 110; // Time after which processes are boosted to Queue 1

//     while (processes.length > 0) {
//         let currentProcess = { ...processes.shift() };
//         let queueIndex = 0; // Start at the highest priority queue

//         // Boost processes to Queue 1 after boostTime
//         if (clock >= boostTime) {
//             queueIndex = 0;
//         } else {
//             // Find the appropriate queue for the current process based on its priority
//             queueIndex = findQueue(currentProcess.priority);
//         }

//         // Execute the process for its time quantum
//         let executeTime = Math.min(timeQuantums[queueIndex], currentProcess.burstTime);
//         currentProcess.burstTime -= executeTime;
//         clock += executeTime;

//         // Update the completion time for the process if it finishes
//         if (currentProcess.burstTime <= 0) {
//             completionTimes[currentProcess.id] = clock;
//         } else {
//             // If the process doesn't finish, demote its priority
//             currentProcess.priority++;
//         }

//         // Push the process back to the appropriate queue
//         queues[queueIndex].push({ ...currentProcess, time: executeTime });

//         // Rotate the queues if needed
//         if (queueIndex < numQueues - 1 && executeTime < currentProcess.burstTime) {
//             queues.push(queues.shift());
//         }
//     }

//     // Store the execution sequence of each queue in the results array
//     for (let queue of queues) {
//         let queueResult = [];
//         let prevClock = 0;
//         for (let process of queue) {
//             queueResult.push({ process: process.id, time: process.time, clock: prevClock });
//             prevClock += process.time;
//         }
//         results.push(queueResult);
//     }

//     console.log(completionTimes);
//     console.log(results);

//     // Generate the Gantt chart HTML
//     const ganttChartHTML = results.map((queueResult, queueIndex) => (
//         <div key={queueIndex} className="gantt-box">
//             {queueResult.map(({ process, time, clock }, index) => (
//                 <div key={index} className="gantt-block" style={{ width: `${time * 20}px` }}>
//                     {`P${process}`}<br />{clock}
//                 </div>
//             ))}
//         </div>
//     ));

//     return (
//         <div className='FCFS-container'>
//             <div className="FCFS-top">
//                 <div className="FCFS-top-left">
//                     <h1> MultiLevel Feedback </h1>
//                     <ProcessTable processes={processes} compTimes={completionTimes} />
//                 </div>
//                 <div className="FCFS-top-right">
//                     <h4> Ready Queue </h4>
//                     <div className="queue-container"></div>
//                 </div>
//             </div>
//             <div className="FCFS-bottom">
//                 <div className="gantt-box">{ganttChartHTML}</div>
//             </div>
//         </div>
//     );
// }

// export default MLFQ;

import { useLocation } from 'react-router-dom';
import { useState } from "react";
import "../css/queues.css"; // Import CSS for styling the queues
import ProcessTable from '../components/ProcessTable';

const MLFQ = () => {
    const location = useLocation();
    let originalProcesses = location.state?.processes; // Original processes for display
    let processes = originalProcesses.map((process, index) => ({ ...process })); // Copy of processes for algorithm

    // Define the number of queues
    const numQueues = 3;

    // Initialize queues array with each queue as an empty array
    let queues = Array.from({ length: numQueues }, () => []);

    let clock = 0; // Initialize the clock at 0
    let completionTimes = {}; // Dictionary to store completion times

    // Define the time quantums for each queue
    const timeQuantums = [8, 15, Infinity];

    // Function to find the appropriate queue for a process based on its priority
    const findQueue = (priority) => {
        if (priority >= 0 && priority < numQueues) {
            return priority;
        } else {
            return numQueues - 1; // If priority is out of range, assign to the lowest priority queue
        }
    };

    // MLFQ algorithm
    while (processes.some(process => !process.completed)) {
        for (let process of processes) {
            if (!process.completed) {
                let queueIndex = findQueue(process.priority);

                // Execute the process for its time quantum
                let executeTime = Math.min(process.burstTime, timeQuantums[queueIndex]);
                clock += executeTime;
                process.burstTime -= executeTime;

                // Update completion time if the process finishes
                if (process.burstTime <= 0) {
                    completionTimes[process.id] = clock;
                    process.completed = true;
                } else {
                    // If the process doesn't finish, demote its priority
                    process.priority++;
                }

                // Push the process back to the appropriate queue
                queues[queueIndex].push(process);
            }
        }
    }

    // Render each queue with its processes
    const queueElements = queues.map((queue, index) => (
        <div key={index} className="queued">
            <h3>Queue {index + 1}</h3>
            <ul>
                {queue.map(process => (
                    <li key={process.id}>Process {process.id}</li>
                ))}
            </ul>
        </div>
    ));

    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> MultiLevel Feedback </h1>
                    <ProcessTable processes={originalProcesses} compTimes={completionTimes} />
                </div>
                <div className="FCFS-top-right">
                    <h4> Ready Queue </h4>
                    <div className="queue-container">
                        {/* Render the queues here */}
                        {queueElements}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MLFQ;
