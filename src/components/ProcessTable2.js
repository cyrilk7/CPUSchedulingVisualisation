import "../css/processTable.css";
import { useState, useEffect } from 'react';


const computeFCFSMetrics = (processes) => {
    // Clone processes array to avoid modifying the original
    const sortedProcesses = [...processes];

    // Initialize variables to calculate metrics
    let completionTime = 0;
    let totalWaitingTime = 0;

    // Calculate completion time, waiting time, and turnaround time for each process
    sortedProcesses.forEach(process => {
        // Update completion time (cumulative burst time)
        completionTime += process.burstTime;

        // Calculate waiting time (time spent waiting in the ready queue)
        process.waitingTime = completionTime - process.arrivalTime - process.burstTime;
        // if (process.waitingTime < 0) {
        //     process.waitingTime = 0; // Waiting time cannot be negative
        // }
        totalWaitingTime += process.waitingTime;

        // Calculate turnaround time (total time from arrival to completion)
        process.turnaroundTime = completionTime - process.arrivalTime;

        // Update completion time in the process object
        process.completionTime = completionTime;
    });

    // Return the array of processes with computed metrics
    return sortedProcesses;
}


const computeRR = (processes) => {
    const sortedProcesses = [...processes];

    let completionTime = 0;
    let totalWaitingTime = 0;
    sortedProcesses.forEach(process => {
        // Calculate completion time
        completionTime += process.burstTime;
        process.completionTime = completionTime;

        // Calculate waiting time
        process.waitingTime = process.completionTime - process.arrivalTime - process.burstTime;

        if (process.waitingTime < 0){
            process.waitingTime = 0;
        }
        totalWaitingTime += Math.max(0, process.waitingTime); // Accumulate total waiting time

        // Calculate turnaround time
        process.turnaroundTime = process.completionTime - process.arrivalTime;
    });

    return sortedProcesses;
}


const ProcessTable = ({ processes, algorithm, compTimes }) => {
    // Clone processes array to avoid modifying the original
    let sortedProcesses

    if (algorithm === 'RR'){
        sortedProcesses = computeRR(processes);
    }
    
    else if(algorithm === 'FCFS'){
        sortedProcesses = computeFCFSMetrics(processes);
    }



    const [visibleRows, setVisibleRows] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleRows(prev => prev + 1);
        }, 1000); // Change animation speed here (milliseconds)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr className="show">
                        <th>Process</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Waiting Time</th>
                        <th>Completion Time</th>
                        <th>Turnaround Time</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Generate table rows using the original order */}
                    {sortedProcesses.map((process, index) => (
                        <tr key={index} className={index < visibleRows ? "show" : ""}>
                            <td>{process.index}</td>
                            <td>{process.arrivalTime}</td>
                            <td>{process.burstTime}</td>
                            <td>{process.waitingTime}</td>
                            <td>{process.completionTime}</td>
                            <td>{process.turnaroundTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div>Total Waiting Time: {totalWaitingTime}</div> */}
        </div>
    );
}

export default ProcessTable;
