import "../css/processTable.css";
import { useState, useEffect } from 'react';


const ProcessTable = ({ processes }) => {
    // Create a copy of the processes array to maintain the original order
    const updatedProcesses = processes.map((process, index) => ({ ...process, index }));
    // console.log(updatedProcesses);

    // Sort processes based on arrival time for display
    const sortedProcesses = updatedProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Calculate turnaround times
    let currentTime = 0;
    sortedProcesses.forEach(process => {
        process.turnaroundTime = currentTime + process.burstTime - process.arrivalTime;
        currentTime += process.burstTime;
    });

    // Calculate waiting times based on turnaround times
    let waitingTime = 0;
    sortedProcesses.forEach(process => {
        process.waitingTime = process.turnaroundTime - process.burstTime;
        if (process.waitingTime < 0){
            process.waitingTime = 0;
        }
        waitingTime += process.burstTime;
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
                            <td>{process.turnaroundTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProcessTable;