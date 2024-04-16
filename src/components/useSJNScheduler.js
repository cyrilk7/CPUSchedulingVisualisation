import { useState } from 'react';
import { MinHeap } from './heap';

function useSJNScheduler(processes) {
    const [result, setResult] = useState([]);
    const [clock, setClock] = useState(0);
    const [prevRunningProcess, setPrevRunningProcess] = useState(null);
    const [time, setTime] = useState(0);

    const [queue, setQueue] = useState(processes);
    const minHeap = new MinHeap();

    while (queue.length > 0 || minHeap.length() > 0) {
        while (queue.length > 0 && queue[0].arrivalTime <= clock) {
            minHeap.add(queue.shift());
        }

        if (minHeap.length() === 0) {
            setClock(clock + 1);
            continue;
        }

        const currentProcess = minHeap.peek();

        if (currentProcess.id !== prevRunningProcess && prevRunningProcess !== null) {
            setResult(prevResult => [
                ...prevResult,
                { process: prevRunningProcess, time: time, clock: clock }
            ]);
            setPrevRunningProcess(currentProcess.id);
            setTime(1);
        } else {
            setPrevRunningProcess(currentProcess.id);
            setTime(time + 1);
        }

        currentProcess.burstTime--;

        if (currentProcess.burstTime === 0) {
            minHeap.remove();
        }

        setClock(clock + 1);
    }

    setResult(prevResult => [
        ...prevResult,
        { process: prevRunningProcess, time: time, clock: clock }
    ]);

    return result;
}

export default useSJNScheduler;
