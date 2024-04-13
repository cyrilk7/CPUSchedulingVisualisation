import "../css/processTable.css";
import { useState, useEffect } from 'react';


const ProcessTable = ({ processes }) => {

    const sortedProcesses = processes;


    // Calculate turnaround times
    console.log(sortedProcesses, "Sorted Processes");
    let currentTime = sortedProcesses[0].arrivalTime;
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
                            <td>{process.index + 1}</td>
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