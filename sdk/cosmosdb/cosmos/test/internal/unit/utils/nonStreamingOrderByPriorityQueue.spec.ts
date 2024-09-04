// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { FixedSizePriorityQueue } from "../../../../src/utils/fixedSizePriorityQueue";

describe("FixedSizePriorityQueue", () => {
  it("should enqueue items", () => {
    const queue = new FixedSizePriorityQueue<number>((a, b) => b - a, 2);
    queue.enqueue(3);
    queue.enqueue(1);
    queue.enqueue(2);
    assert.equal(queue.size(), 2);
  });

  it("should dequeue items in correct order", () => {
    // collect the top 2 elements in descending order
    const queue = new FixedSizePriorityQueue<number>((a, b) => b - a, 2);
    queue.enqueue(3);
    queue.enqueue(1);
    assert.equal(queue.peek(), 1);
    queue.enqueue(2);
    assert.equal(queue.peek(), 2);
    const topElements = queue.getTopElements();
    assert.equal(topElements.length, 2);
    assert.equal(topElements[0], 3);
    assert.equal(topElements[1], 2);

    // collect the top 2 elements in ascending order
    const queue2 = new FixedSizePriorityQueue<number>((a, b) => a - b, 2);
    queue2.enqueue(3);
    queue2.enqueue(1);
    assert.equal(queue2.peek(), 3);
    queue2.enqueue(2);
    assert.equal(queue2.peek(), 2);
    const topElements2 = queue2.getTopElements();
    assert.equal(topElements2.length, 2);
    assert.equal(topElements2[0], 1);
    assert.equal(topElements2[1], 2);

    // collect the top 4 elements in descending order
    const queue3 = new FixedSizePriorityQueue<number>((a, b) => b - a, 4);
    queue3.enqueue(3);
    queue3.enqueue(3);
    queue3.enqueue(1);
    assert.equal(queue3.peek(), 1);
    queue3.enqueue(2); // 1, 2, 3, 3
    assert.equal(queue3.peek(), 1);
    queue3.enqueue(4); // 2, 3, 3, 4
    assert.equal(queue3.peek(), 2);
    const topElements3 = queue3.getTopElements();
    assert.equal(topElements3.length, 4);
    assert.equal(topElements3[0], 4);
    assert.equal(topElements3[1], 3);
    assert.equal(topElements3[2], 3);
    assert.equal(topElements3[3], 2);

    // collect the top 4 elements in ascending order
    const queue4 = new FixedSizePriorityQueue<number>((a, b) => a - b, 4);
    queue4.enqueue(3);
    queue4.enqueue(3);
    queue4.enqueue(1);
    assert.equal(queue4.peek(), 3);
    queue4.enqueue(2);
    assert.equal(queue4.peek(), 3);
    queue4.enqueue(1);
    assert.equal(queue4.peek(), 3);
    const topElements4 = queue4.getTopElements();
    assert.equal(topElements4.length, 4);
    assert.equal(topElements4[0], 1);
    assert.equal(topElements4[1], 1);
    assert.equal(topElements4[2], 2);
    assert.equal(topElements4[3], 3);
  });

  it("should return correct size and emptiness", () => {
    const queue = new FixedSizePriorityQueue<number>((a, b) => a - b, 2);
    assert.equal(queue.isEmpty(), true);
    queue.enqueue(5);
    assert.equal(queue.size(), 1);
    assert.equal(queue.isEmpty(), false);
    queue.dequeue();
    assert.equal(queue.size(), 0);
    assert.equal(queue.isEmpty(), true);
  });

  it("should peek at the top element", () => {
    const queue = new FixedSizePriorityQueue<number>((a, b) => a - b, 2);
    queue.enqueue(3);
    queue.enqueue(1);
    assert.equal(queue.peek(), 3);
    assert.equal(queue.size(), 2);
  });

  it("should retrieve top elements in correct order", () => {
    const queue = new FixedSizePriorityQueue<number>((a, b) => a - b, 2);
    queue.enqueue(3);
    queue.enqueue(1);
    queue.enqueue(2);
    const topElements = queue.getTopElements();
    assert.equal(topElements.length, 2);
    assert.equal(topElements[0], 1);
    assert.equal(topElements[1], 2);
    assert.equal(queue.size(), 0);
  });
});
