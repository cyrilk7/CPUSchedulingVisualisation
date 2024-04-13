import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
// import { select, scaleLinear } from "d3";
import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";




const SJN = () => {
    const location = useLocation();
    let processes = location.state?.processes;
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let [queue, setQueue] = useState(processes);
    console.log(processes);
    console.log(queue[0])
    
    
    //minHeap initialization
    let minHeap = new MinHeap();
    // minHeap.add(processes[1]);
    // minHeap.add(processes[0]);

    // let [currentProcess, setCurrentProcess] = useState(minHeap.peek());
    // console.log(currentProcess);

    //algorithm to run SJN
    let clock = 0;
    while (queue.length > 0 || minHeap.length > 0) {
        if (queue.length > 0 && queue[0].arrivalTime <= clock) { //if there are processes in the queue and the arrival time of the first process is less than or equal to the clock
            minHeap.add(queue.shift());
            console.log(minHeap.printHeap());
        }
        let currentProcess = minHeap.peek();
        console.log(currentProcess)
        if (minHeap.length>0 && currentProcess.burstTime > 0) {
            currentProcess.burstTime--;
            
        }
        else if (currentProcess.burstTime === 0) {
            minHeap.remove();
        }

        clock++;
        console.log(minHeap.printHeap());
    }





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