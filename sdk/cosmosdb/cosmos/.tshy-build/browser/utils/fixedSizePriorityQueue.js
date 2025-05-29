// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PriorityQueue from "priorityqueuejs";
export class FixedSizePriorityQueue {
    constructor(compareFn, pqMaxSize) {
        this.compareFn = compareFn;
        this.pq = new PriorityQueue(this.compareFn);
        this.pqMaxSize = pqMaxSize;
    }
    enqueue(item) {
        if (this.pq.size() < this.pqMaxSize) {
            this.pq.enq(item);
        }
        else {
            const topItem = this.pq.peek();
            if (this.compareFn(topItem, item) > 0) {
                this.pq.deq();
                this.pq.enq(item);
            }
        }
    }
    dequeue() {
        return this.pq.deq();
    }
    size() {
        return this.pq.size();
    }
    isEmpty() {
        return this.pq.isEmpty();
    }
    peek() {
        return this.pq.peek();
    }
    getTopElements() {
        const elements = [];
        while (!this.pq.isEmpty()) {
            elements.unshift(this.pq.deq());
        }
        return elements;
    }
    // Create a new instance of FixedSizePriorityQueue with a reversed compare function and the same maximum size.
    // Enqueue all elements from the current priority queue into the reverse priority queue.
    reverse() {
        const reversePQ = new FixedSizePriorityQueue((a, b) => -this.compareFn(a, b), this.pqMaxSize);
        while (!this.pq.isEmpty()) {
            reversePQ.enqueue(this.pq.deq());
        }
        return reversePQ;
    }
}
//# sourceMappingURL=fixedSizePriorityQueue.js.map