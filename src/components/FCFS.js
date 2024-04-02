import { useLocation } from 'react-router-dom';
import ProcessTable from '../components/ProcessTable';
import "../css/FCFS.css";
import { select, scaleLinear, max } from "d3";
import { useState, useEffect, useRef } from "react";



function runFCFS(readyQueue, setReadyQueue, setGanttChart) {
    let queueCopy = [...readyQueue];
    let ganttChartCopy = [];
    let executionTime = 10000;

    setTimeout(() => {
        if (queueCopy.length > 0) {
            const next = queueCopy.shift()
            setReadyQueue(queueCopy);
        }
    }, executionTime);
}



const FCFS = () => {
    const location = useLocation();
    let processes = location.state?.processes;
    const updatedProcesses = processes.map((process, index) => ({ ...process, index }));
    const [executionStarted, setExecutionStarted] = useState(false);

    // Sort processes based on arrival time for display
    const sortedProcesses = updatedProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);

    const [data, setData] = useState(sortedProcesses);
    let queueCopy = [...data];
    const [queue, setQueue] = useState(queueCopy);
    const [ganttChart, setGanttChart] = useState(null);
    const svgRef = useRef(null);
    const width = 700;
    const height = 100;
    const totalBurstTime = data.reduce((acc, obj) => acc + obj.burstTime, 0);
    const xScale = scaleLinear().domain([0, totalBurstTime]).range([0, width]);
    const yScale = scaleLinear().domain([0, height]).range([0, height]);


    const renderQueue = (data) => {
        const svg = select(svgRef.current);
        svg.attr('width', width).attr('height', height);
        const bars = svg.selectAll('rect').data(data);

        let cumulativeX = 0;
        data.forEach((d, i) => {
            d.xPosition = cumulativeX;
            cumulativeX += xScale(d.burstTime); // Increase cumulative position by the width of the current bar
        });

        // Update existing bars with transition
        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('x', width) // Start from the right edge of the SVG
            .attr('height', height)
            .attr('width', d => xScale(d.burstTime))
            .attr('y', height - height)
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
            .text((d) => "P" + d.index) // Set the initial text content of the label
            .transition()
            .duration(500) // Duration of the transition in milliseconds
            .delay((d, i) => i * 1000) // Delay for each label to create sequential appearance
            .attr('x', d => d.xPosition + (xScale(d.burstTime) / 2) - labelOffsetX); // Animate to the correct x-position

        // Remove bars that are no longer needed
        values.exit().remove();


    }

    const removeFirstElement = () => {
        setData(prevData => prevData.slice(1)); // Remove the first element
    };



    useEffect(() => {
        renderQueue(data);
    }, [data]);



    useEffect(() => {
        let queueCopy = [...data];
        let ganttChartCopy = [];
        let executionTime = 10000;
        var next;

        // Function to process the next element after a specified delay
        const processNext = () => {
            if (queueCopy.length > 0) {
                next = queueCopy.shift();
                setTimeout(processNext, next.burstTime * 1000);
                // Update state to remove the processed element from the queue
                setData(queueCopy);
                // Add the processed element to the Gantt chart
                ganttChartCopy.push(next);
                setGanttChart(ganttChartCopy);

                // Schedule the next execution based on the burst time of the processed element
            }
        };

        // Wait for 10 seconds before setting the execution started signal
        const initialTimeout = setTimeout(() => {
            setExecutionStarted(true);
            console.log("Statrted");
            processNext(); // Start the actual execution
        }, executionTime);

        // Clean up the initial timeout to prevent it from executing after the component unmounts
        return () => clearTimeout(initialTimeout);
    }, [data]);


    return (
        <div className='FCFS-container'>
            <div className="FCFS-top">
                <div className="FCFS-top-left">
                    <h1> First Come First Serve </h1>
                    <ProcessTable processes={processes} />
                </div>

                <div className="FCFS-top-right">
                    <h4> Ready Queue </h4>
                    <div className="queue-container">
                        <svg ref={svgRef} className="queue" width="700" height="450"></svg>
                    </div>
                    <button onClick={removeFirstElement}>Remove First Element</button>

                </div>
            </div>

        </div>
    );
}

export default FCFS;