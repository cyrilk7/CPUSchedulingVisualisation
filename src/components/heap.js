export class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper Methods
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    // Functions to create Min Heap

    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    // Removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called 
    remove() {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index).burstTime > this.heap[index].burstTime) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index).burstTime < this.leftChild(index).burstTime) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index].burstTime < this.heap[smallerChildIndex].burstTime) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    printHeap() {
        const heapStr = this.heap.map(obj => `{ arrivalTime: ${obj.arrivalTime}, burstTime: ${obj.burstTime} }`).join(' ');
        console.log(heapStr);
    }
}

// Example Usage:

// Creating the Heap
var heap = new MinHeap();

// Adding The Elements
// heap.add({ arrivalTime: 0, burstTime: 150 });
// heap.add({ arrivalTime: 0, burstTime: 15 });
// heap.add({ arrivalTime: 0, burstTime: 30 });
// heap.add({ arrivalTime: 0, burstTime: 40 });
// heap.add({ arrivalTime: 0, burstTime: 50 });
// heap.add({ arrivalTime: 0, burstTime: 100 });
// heap.add({ arrivalTime: 0, burstTime: 10 });


// Printing the Heap
// console.log(heap.peek()); 
// heap.printHeap();

// Peeking And Removing Top Element
// console.log(heap.peek());
// console.log(heap.remove());

// Printing the Heap
// After Deletion.
// heap.printHeap();
