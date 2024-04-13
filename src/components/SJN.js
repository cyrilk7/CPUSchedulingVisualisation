import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
// import { select, scaleLinear } from "d3";
import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";




const SJN = () => {
    const location = useLocation();
    let processes = location.state?.processes;

    //assigning process ids to the processes
    for(let i = 0; i < processes.length; i++){
        processes[i].id = i+1;
    }
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let [queue, setQueue] = useState(processes);
  


    //minHeap initialization
    let minHeap = new MinHeap();
    let result = [];
    let time = 0;
    

    let prev_running_process = null;

    //algorithm to run SJN
    let clock = 0;
    while (queue.length > 0 || minHeap.length() > 0) {
        while (queue.length > 0 && queue[0].arrivalTime <= clock) { //if there are processes in the queue and the arrival time of the first process is less than or equal to the clock
            minHeap.add(queue.shift());
        }

        // making sure that the minHeap is not empty
        if (minHeap.length() === 0) {
            clock++;
            continue;
        }

        //get the current process
        let currentProcess = minHeap.peek();
        if (currentProcess.id !== prev_running_process && prev_running_process !== null) {
            result.push({ process: prev_running_process, time: time, clock: clock });
            prev_running_process = currentProcess.id;
            time = 1;
        } else {
            prev_running_process = currentProcess.id;
            time++;
        }
    
        currentProcess.burstTime--;
        if (currentProcess.burstTime === 0) {
            
            minHeap.remove();
        }

        clock++;
        minHeap.printHeap();
    }
    result.push({ process: prev_running_process, time: time, clock: clock });

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

export default SJN;