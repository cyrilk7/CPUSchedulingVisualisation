import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import { useState, useRef, useEffect } from "react";
import "../css/ganttChart.css"; // Import CSS for styling the Gantt chart
import { select, scaleLinear } from "d3";

const RR = () => {
    const location = useLocation();
    let myProcesses = location.state?.processes;

    // Assigning process ids to the processes
    const updatedProcesses = myProcesses.map((process, index) => ({ ...process, index: index + 1 }));

    const sortedProcesses = updatedProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const [processes, setProcesses] = useState(sortedProcesses);

    // Create a clone of the processes array to work with
    let queue = [...processes];
    const svgRef = useRef(null);
    const ganttRef = useRef(null);
    const [begin, setBegin] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isProcessRunning, setIsProcessRunning] = useState(false);

    let result = [];
    let quantum = 5;
    let clock = processes[0].arrivalTime; // Initialize the clock at 0
    let completionTimes = {}; // Dictionary to store completion times
    const [seconds, setSeconds] = useState(0);
    const [data, setData] = useState([]);
    const [ganttChart, setGanttChart] = useState([]);

    while (queue.length > 0) {
        let currentProcess = { ...queue.shift() };

        currentProcess.ganttEntryTime = clock;

        let executeTime = Math.min(quantum, currentProcess.burstTime);
        currentProcess.executeTime = executeTime;
        currentProcess.burstTime -= executeTime;
        clock += executeTime;

        result.push({ process: currentProcess, time: executeTime, clock: clock });

        if (currentProcess.burstTime > 0) {
            // currentProcess.arrivalTime = clock;
            let newProcess = { ...currentProcess, arrivalTime: clock };
            queue.push(newProcess);
        } else {
            completionTimes[currentProcess.index] = clock; // Store completion time for the process
        }
    }

    const copiedResult = [...result];
    console.log(copiedResult);


    const renderQueue = (data) => {
        const width = 750;
        const height = 100;
        const totalExecuteTime = data.reduce((acc, obj) => acc + obj.executeTime, 0);
        const xScale = scaleLinear().domain([0, totalExecuteTime]).range([0, width]);
        const svg = select(svgRef.current);
        svg.attr('width', width).attr('height', height);

        const bars = svg.selectAll('rect').data(data);

        let cumulativeX = 0;
        data.forEach((d, i) => {
            d.xPosition = cumulativeX;
            cumulativeX += xScale(d.executeTime); // Increase cumulative position by the width of the current bar
        });

        // Update existing bars with transition
        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('x', width) // Start from the right edge of the SVG
            .attr('height', height)
            .attr('width', d => xScale(d.executeTime))
            .attr('y', 0)
            .attr('fill', (d, i) => i % 2 === 0 ? '#9787CE' : '#F2F2F2 ')
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            .delay((d, i) => i * 1000) // Delay for each rectangle to create sequential appearance
            .attr('x', d => d.xPosition); // Animate to the correct x-position

        // Remove bars that are no longer needed
        bars.exit().remove();

        // Add labels inside the middle of the squares
        const labelOffsetX = 2; // Offset for x-coordinate
        const labelOffsetY = height / 2; // Offset for y-coordinate
        const values = svg.selectAll('.value').data(data);

        values.enter()
            .append('text')
            .merge(values)
            .attr('x', width) // Start from the right edge of the SVG
            .attr('y', labelOffsetY) // Adjust the y-position of the label
            .attr('fill', 'black') // Set label color
            .attr('font-weight', 'bold') // Set font weight to bold
            .attr('text-anchor', 'middle') // Center the text horizontally
            .attr('class', 'value')
            .attr('alignment-baseline', 'middle') // Center the text vertically
            .text((d) => "P" + (d.index)) // Set the initial text content of the label
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            .delay((d, i) => i * 1000) // Delay for each label to create sequential appearance
            .attr('x', d => d.xPosition + (xScale(d.executeTime) / 2) - labelOffsetX); // Animate to the correct x-position

        // Remove bars that are no longer needed
        values.exit().remove();


    }

    const renderGantt = (data, processes) => {
        // Using reduce to sum up the 'executionTime' of each 'process' object
        const totalExecutionTime = processes.reduce((total, obj) => {
            return total + obj.process.executeTime;
        }, 0);
        const ganttWidth = 1200;
        const height = 200;
        const gannttXscale = scaleLinear().domain([0, totalExecutionTime]).range([0, ganttWidth]);

        const svg = select(ganttRef.current);
        svg.attr('width', ganttWidth).attr('height', height);
        const bars = svg.selectAll('rect').data(data);

        let cumulativeX = 0;
        data.forEach((d, i) => {
            console.log(d.executeTime)
            d.xPosition = cumulativeX;
            cumulativeX += gannttXscale(d.executeTime); // Increase cumulative position by the width of the current bar
        });

        // Update existing bars with transition
        bars.enter()
            .append('rect')
            .attr('height', height)
            .attr('y', height - height)
            .merge(bars)
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            .attr('width', d => gannttXscale(d.executeTime))
            .attr('x', d => d.xPosition) // Animate to the correct x-position
            .attr('fill', (d, i) => {
                if (i === data.length - 1) {
                    return '#90CCB3'
                } else {
                    return '#9787CE';
                }
            })
            .attr('stroke', 'black') // Set border color
            .attr('stroke-width', 2); // Set border width


        data.forEach(d => {
            if (!d.elapsedTime) {
                d.elapsedTime = 0;
                const simulationInterval = setInterval(() => {
                    d.elapsedTime += 0.1; // Simulate elapsed time increment (adjust as needed)
                    if (d.elapsedTime >= d.executeTime) {
                        clearInterval(simulationInterval);

                    }
                    renderGantt(data, processes); // Update chart continuously
                }, 100); // Update every 100 milliseconds (adjust as needed)
            }
        });

        // Remove bars that are no longer needed
        bars.exit().remove();

        // Add labels inside the middle of the squares
        const labelOffsetX = 2; // Offset for x-coordinate
        const labelOffsetY = height / 2; // Offset for y-coordinate
        const values = svg.selectAll('.value').data(data);

        values.enter()
            .append('text')
            .attr('y', labelOffsetY) // Adjust the y-position of the label
            .attr('text-anchor', 'middle') // Center the text horizontally
            .attr('class', 'value')
            .attr('alignment-baseline', 'middle') // Center the text vertically
            .attr('fill', 'black') // Set label color
            .attr('font-weight', 'bold') // Set font weight to bold
            .text((d) => "P" + (d.index)) // Set the initial text content of the label
            .merge(values)
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            .attr('x', (d) => d.xPosition + (gannttXscale(d.executeTime) / 2));


        // Remove bars that are no longer needed
        values.exit().remove();
    }




    useEffect(() => {
        const delaySeconds = 3; // Delay in seconds before timer starts

        // Set a timeout to start the timer after the delay
        const delayTimeout = setTimeout(() => {
            setBegin(true) // Start the timer at 0 after the delay
        }, delaySeconds * 1000); // Convert delaySeconds to milliseconds

        // Cleanup function to clear the timeout if component unmounts or timer starts
        return () => clearTimeout(delayTimeout);
    }, []);

    useEffect(() => {

        if (begin) {
            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [begin]);

    useEffect(() => {
        // Function to add processes to the ready queue based on arrival time
        const addProcessesToReadyQueue = () => {
            // console.log(queue.length)
            // Iterate over processes starting from the offset
            for (let i = offset; i < result.length; i++) {
                // console.log("s")
                const currentProcess = result[i].process;
                if (currentProcess.arrivalTime === seconds) {
                    // Add the process to the ready queue
                    setData(prevQueue => [...prevQueue, currentProcess]);
                    // Update the offset to skip processed processes
                    setOffset(i + 1);
                    // console.log(data);
                } else if (currentProcess.arrivalTime > seconds) {
                    // Since processes array is sorted by arrival time,
                    // no need to check further if arrival time is in future
                    break;
                }
            }
        };

        // Call addProcessesToReadyQueue on each timer tick
        addProcessesToReadyQueue();
    }, [seconds, data]);

    useEffect(() => {
        renderQueue(data);
    }, [data]);

    useEffect(() => {
        // console.log(ganttChart)
        // console.log(copiedResult)
        renderGantt(ganttChart, copiedResult);
    }, [ganttChart]);

    const removeFirstElement = () => {
        if (data.length > 0) {
            const executedProcess = data[0]; // Get the first process in the ready queue
            setGanttChart(prevChart => [...prevChart, executedProcess]); // Add executed process to Gantt chart
            setData(prevQueue => prevQueue.slice(1)); // Remove the executed process from the ready queue
            return executedProcess;
        }
    };

    useEffect(() => {
        const executeProcess = () => {
            if (!isProcessRunning && data.length > 0) {
                const nextProcess = removeFirstElement();
                setIsProcessRunning(true);

                setTimeout(() => {
                    setIsProcessRunning(false); // Process execution completes
                }, nextProcess.executeTime * 1000); // Simulate burst time in seconds (multiply by 1000 for milliseconds)
            }
        };


        const queueChangeTimer = setInterval(() => {
            executeProcess(); // Check for process execution on every interval
        }, 1000);

        return () => clearInterval(queueChangeTimer);
    }, [isProcessRunning, data])


    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> Round Robin Scheduling </h1>
                    <ProcessTable processes={processes} compTimes={completionTimes} algorithm={'RR'} />
                </div>
                <div className="FCFS-top-right">
                    <h2 className='timer'>Timer:  <span> {seconds} seconds </span> </h2>
                    <h2 className='timer'>Quantum Time:  <span> {quantum} </span> </h2>
                    <h4> Ready Queue </h4>
                    <div className="queue-container">
                        <svg ref={svgRef} className="queue" width="700" height="150"></svg>
                    </div>
                </div>
            </div>
            <div className="FCFS-bottom">
                <div className="gantt-box">
                    <svg id='ganttChartContainer' ref={ganttRef} className="queue" width="700" height="400"></svg>
                </div>
            </div>
        </div>
    );
}

export default RR;
