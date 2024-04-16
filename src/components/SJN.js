import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
// import { select, scaleLinear } from "d3";
// import { MinHeap } from './heap';
import { useState, useEffect, useRef } from "react";
import useSJNScheduler from '../components/useSJNScheduler';




const SJN = () => {
    const location = useLocation();
    let processes = location.state?.processes;
    // console.log(processes);

    //assigning process ids to the processes
    for(let i = 0; i < processes.length; i++){
        processes[i].id = i+1;
    }
    const sorted = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedulingResult = useSJNScheduler(processes);
    




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