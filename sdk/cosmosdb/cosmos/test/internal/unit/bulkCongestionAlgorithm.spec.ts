// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { BulkCongestionAlgorithm } from "../../../src/bulk/BulkCongestionAlgorithm";
import { BulkPartitionMetric } from "../../../src/bulk/BulkPartitionMetric";
import { Limiter } from "../../../src/bulk/Limiter";

describe("Bulk Congestion Algorithm", () => {
  let limiter: Limiter;
  let oldPartitionMetric: BulkPartitionMetric;
  let partitionMetric: BulkPartitionMetric;
  let degreeOfConcurrency: number;

  beforeEach(() => {
    limiter = new Limiter(50);
    oldPartitionMetric = new BulkPartitionMetric();
    partitionMetric = new BulkPartitionMetric();
  });
  it("should increase concurrency by 1 when there is no throttling and items are processed", () => {
    degreeOfConcurrency = 1;
    const itemsCount = 10; // 10 items processed
    const timeTakenInMs = 1100; // should be greater than congestionWaitTimeInMs (1000 ms)
    const numberOfThrottles = 0; // no throttling
    const algorithm = new BulkCongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 2);
  });

  it("should decrease concurrency when there is throttling", () => {
    degreeOfConcurrency = 10;
    const itemsCount = 10; // 10 items processed
    let timeTakenInMs = 1100; // should be greater than congestionWaitTimeInMs (1000 ms)
    const numberOfThrottles = 2; // throttling
    const algorithm = new BulkCongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 5);

    // degree of Concurrency should not be less than 1. The decrease factor should be min(5, degreeOfConcurrency/2)
    timeTakenInMs += 1000; // should be greater than congestionWaitTimeInMs, will increase after throttle (2000 ms)
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 3);

    timeTakenInMs += 1000; // should be greater than congestionWaitTimeInMs, will again increase after throttle (3000 ms)
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 2);
    timeTakenInMs += 1000; // should be greater than congestionWaitTimeInMs, will again increase after throttle (4000
  });
  it("should not modify degree of concurrency when elapsed time is less than congestionWaitTimeInMs(1000)", () => {
    // should not decrease concurrency even if there is throttling
    degreeOfConcurrency = 10;
    let itemsCount = 10;
    const timeTakenInMs = 100;
    let numberOfThrottles = 2;
    const algorithm = new BulkCongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 10);

    // should not increase concurrency even if there is no throttling
    itemsCount += 10;
    numberOfThrottles = 0;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 10);
  });

  it("degree of concurrency should not be less than 1", () => {
    degreeOfConcurrency = 1;
    const itemsCount = 10;
    const timeTakenInMs = 1100;
    const numberOfThrottles = 2;
    const algorithm = new BulkCongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    degreeOfConcurrency = algorithm.run(degreeOfConcurrency);
    assert.strictEqual(degreeOfConcurrency, 1);
  });
});
