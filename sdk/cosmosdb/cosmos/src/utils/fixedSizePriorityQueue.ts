// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import PriorityQueue from "priorityqueuejs";

export class FixedSizePriorityQueue<T> {
  private pq: PriorityQueue<T>;
  // The compare function should return a positive number if a is greater than b, a negative number if a is less than b, and 0 if a is equal to b.
  private compareFn: (a: T, b: T) => number;
  private pqMaxSize: number;

  constructor(compareFn: (a: T, b: T) => number, pqMaxSize: number) {
    this.compareFn = compareFn;
    this.pq = new PriorityQueue<T>(this.compareFn);
    this.pqMaxSize = pqMaxSize;
  }

  public enqueue(item: T): void {
    if (this.pq.size() < this.pqMaxSize) {
      this.pq.enq(item);
    } else {
      const topItem = this.pq.peek();
      if (this.compareFn(topItem, item) > 0) {
        this.pq.deq();
        this.pq.enq(item);
      }
    }
  }

  public dequeue(): T {
    return this.pq.deq();
  }

  public size(): number {
    return this.pq.size();
  }

  public isEmpty(): boolean {
    return this.pq.isEmpty();
  }

  public peek(): T {
    return this.pq.peek();
  }

  public getTopElements(): T[] {
    const elements: T[] = [];
    while (!this.pq.isEmpty()) {
      elements.unshift(this.pq.deq());
    }
    return elements;
  }

  // Create a new instance of FixedSizePriorityQueue with a reversed compare function and the same maximum size.
  // Enqueue all elements from the current priority queue into the reverse priority queue.
  public reverse(): FixedSizePriorityQueue<T> {
    const reversePQ = new FixedSizePriorityQueue<T>(
      (a: T, b: T) => -this.compareFn(a, b),
      this.pqMaxSize,
    );
    while (!this.pq.isEmpty()) {
      reversePQ.enqueue(this.pq.deq());
    }
    return reversePQ;
  }
}
