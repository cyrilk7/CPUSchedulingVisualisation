# CPU Scheduling Visualization Tool

## Overview
This project is a CPU scheduling visualization tool built using React and D3.js. It provides an interactive interface to visualize various CPU scheduling algorithms. The backend code is written in JavaScript. 

You can access a youtube video of a demo [here](https://www.youtube.com/watch?v=yxLUkck-Xok)

## Deployment
The project is deployed on Vercel. You can access it [here](https://cpu-scheduling-visualisation.vercel.app/).

## Features
- **Landing Page:** Upon visiting the deployed link, users are directed to the landing page where they can explore the available CPU scheduling algorithms.
- **Available Algorithms:** Four CPU scheduling algorithms are provided:
  1. First Come First Serve
  2. Shortest Job Next
  3. Round Robin
  4. Multi-Level Feedback Queue (MLFQ)
- **Modal Input:** Upon selecting an algorithm, a modal appears where users can input the number of processes, arrival times, and burst times for each process.
- **Error Handling:** The system handles the following errors:
  1. Users cannot enter a number of processes less than 1.
  2. Users cannot enter burst times or arrival times less than or equal to 0.

## Usage
1. Visit the [deployed link](https://cpu-scheduling-visualisation.vercel.app/).
2. Scroll down or click the "Get Started" button to view the available CPU scheduling algorithms.
3. Select an algorithm to visualize.
4. Input the number of processes, arrival times, and burst times for each process in the modal.
5. Click "Submit" to visualize the scheduling.

## Technologies Used
- React
- D3.js
- JavaScript (Backend)
- Bootstrap
- React Bootstrap


## Contact
This is a collaborative project coded by Abigail Animah Owusu and Cyril Kujar.
If you have any questions or suggestions, feel free to contact us at [abigailowusu296@gmail.com](mailto:your-email@example.com) or [cyrilkujar@gmail.com](mailto:your-email@example.com) .