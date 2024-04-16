// import { useLocation } from 'react-router-dom';
// import ProcessTable from '../components/ProcessTable';
// import "../css/FCFS.css";
// // import { select, scaleLinear } from "d3";

// import { useState, useEffect, useRef } from "react";




// const RR = () => {
//     const location = useLocation();
//     let processes = location.state?.processes;

//     // Assigning process ids to the processes
//     for (let i = 0; i < processes.length; i++) {
//         processes[i].id = i + 1;
//     }
//     processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
//     let queue = [...processes]; // Using a single queue for all processes

//     let result = [];
//     let quantum = 4;
//     let clock = 0; // Initialize the clock at 0

//     while (queue.length > 0) {
//         let currentProcess = queue.shift(); // Get the next process from the queue

//         // Determine the time to execute the process
//         let executeTime = Math.min(quantum, currentProcess.burstTime);
//         currentProcess.burstTime -= executeTime;
//         clock += executeTime;

//         // Record the execution in the result
//         result.push({ process: currentProcess.id, time: executeTime, clock: clock });

//         // If the process is not completed, add it back to the end of the queue
//         if (currentProcess.burstTime > 0) {
//             queue.push(currentProcess);
//         }
//     }

//     console.log(result);
    

//     return (
//         <div className='FCFS-container'>
//             <div className="FCFS-top">
//                 <div className="FCFS-top-left">
//                     <h1> Round Robin Scheduling </h1>
//                     <ProcessTable processes={processes} />
//                 </div>

//                 <div className="FCFS-top-right">
//                     {/* <h2 className='timer'>Timer:  <span> {seconds} seconds </span> </h2> */}
//                     <h4> Ready Queue </h4>
//                     <div className="queue-container">
//                         {/* <svg ref={svgRef} className="queue" width="700" height="450"></svg> */}
//                     </div>

//                 </div>
//             </div>
//             <div className="FCFS-bottom">
//                 <div className="gantt-box">
//                     {/* <svg id='ganttChartContainer' ref={ganttRef} className="queue" width="700" height="450"></svg> */}
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default RR;



// import { useLocation } from 'react-router-dom';
// import ProcessTable from '../components/ProcessTable';
// import { useState } from "react";

// const RR = () => {
//     const location = useLocation();
//     let processes = location.state?.processes;

//     // Assigning process ids to the processes
//     processes = processes.map((process, index) => ({
//         ...process,
//         id: index + 1
//     }));

//     processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

//     // Create a clone of the processes array to work with
//     let queue = [...processes];

//     let result = [];
//     let quantum = 5;
//     let clock = 0; // Initialize the clock at 0
//     let completion_time = 0
//     while (queue.length > 0) {
//         // Clone the current process to avoid modifying the original object
//         let currentProcess = { ...queue.shift() };

//         // Determine the time to execute the process
//         let executeTime = Math.min(quantum, currentProcess.burstTime);
//         currentProcess.burstTime -= executeTime;
//         clock += executeTime;

//         // Record the execution in the result
//         result.push({ process: currentProcess.id, time: executeTime, clock: clock });

//         // If the process is not completed, add it back to the end of the queue
//         if (currentProcess.burstTime > 0) {
//             queue.push(currentProcess);
//         }
    

//     }

//     console.log(result);

//     return (
//         <div className='FCFS-container'>
//             <div className="FCFS-top">
//                 <div className="FCFS-top-left">
//                     <h1> Round Robin Scheduling </h1>
//                     <ProcessTable processes={processes} />
//                 </div>

//                 <div className="FCFS-top-right">
//                     <h4> Ready Queue </h4>
//                     <div className="queue-container"></div>
//                 </div>
//             </div>
//             <div className="FCFS-bottom">
//                 <div className="gantt-box"></div>
//             </div>
//         </div>
//     );
// }

// export default RR;


import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import { useState } from "react";
import "../css/ganttChart.css"; // Import CSS for styling the Gantt chart

const RR = () => {
    const location = useLocation();
    let processes = location.state?.processes;

    // Assigning process ids to the processes
    processes = processes.map((process, index) => ({
        ...process,
        id: index + 1
    }));

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Create a clone of the processes array to work with
    let queue = [...processes];

    let result = [];
    let quantum = 5;
    let clock = 0; // Initialize the clock at 0
    let completionTimes = {}; // Dictionary to store completion times

    while (queue.length > 0) {
        let currentProcess = { ...queue.shift() };

        let executeTime = Math.min(quantum, currentProcess.burstTime);
        currentProcess.burstTime -= executeTime;
        clock += executeTime;

        result.push({ process: currentProcess.id, time: executeTime, clock: clock });

        if (currentProcess.burstTime > 0) {
            queue.push(currentProcess);
        } else {
            completionTimes[currentProcess.id] = clock; // Store completion time for the process
        }
    }

    console.log(result);
    console.log(completionTimes);

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
                    <h1> Round Robin Scheduling </h1>
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

export default RR;
