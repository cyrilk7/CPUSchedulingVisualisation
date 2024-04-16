

import "../css/processTable.css";
import { useState, useEffect } from 'react';

const ProcessTable = ({ processes, compTimes, algorithm }) => {
    // Clone processes array to avoid modifying the original
    // console.log(compTimes, "ss")
    const sortedProcesses = [...processes];
    // console.log(sortedProcesses, "Sorted Processes");
    // console.log(compTimes, "Completion Times");
    // Calculate completion time, waiting time, and turnaround time
    let completionTime = 0;
    let totalWaitingTime = 0;
    sortedProcesses.forEach(process => {
        // Calculate completion time
        completionTime += process.burstTime;
        process.completionTime = completionTime;

        // Calculate waiting time
        process.waitingTime = process.completionTime - process.arrivalTime - process.burstTime;
        if (process.waitingTime < 0) {
            process.waitingTime = 0;
        }
        totalWaitingTime += Math.max(0, process.waitingTime); // Accumulate total waiting time

        // Calculate turnaround time
        process.turnaroundTime = process.completionTime - process.arrivalTime;
    });

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
                            {algorithm === "FCFS" ? (
                                <>
                                    <td>{process.completionTime}</td>
                                </>
                            ) : (
                                <>
                                    <td>{compTimes[process.index]}</td>

                                </>
                            )}

                            <td>{process.turnaroundTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Total Waiting Time: {totalWaitingTime}</div>
        </div>
    );
}

export default ProcessTable;