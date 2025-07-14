// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, beforeEach, describe, it } from "vitest";
import { CongestionAlgorithm } from "../../../../src/bulk/CongestionAlgorithm.js";
import { PartitionMetric } from "../../../../src/bulk/PartitionMetric.js";
import { LimiterQueue } from "../../../../src/bulk/Limiter.js";
import type { RetryCallback } from "../../../../src/utils/batch.js";
import { Constants } from "../../../../src/index.js";

describe("CongestionAlgorithm", () => {
  let limiter: LimiterQueue;
  let oldPartitionMetric: PartitionMetric;
  let partitionMetric: PartitionMetric;

  const mockRetrier: RetryCallback = async () => {};

  beforeEach(() => {
    oldPartitionMetric = new PartitionMetric();
    partitionMetric = new PartitionMetric();
    limiter = new LimiterQueue(1, partitionMetric, mockRetrier, {} as any);
  });
  it("should increase concurrency by 1 when there is no throttling and items are processed", () => {
    const itemsCount = 10; // 10 items processed
    const timeTakenInMs = 1100; // should be greater than congestionWaitTimeInMs (1000 ms)
    const numberOfThrottles = 0; // no throttling
    const algorithm = new CongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    algorithm["currentDegreeOfConcurrency"] = 1;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 2, "increase factor should be 1");
  });

  it("should decrease concurrency when there is throttling", () => {
    const itemsCount = 10; // 10 items processed
    let timeTakenInMs = 1100; // should be greater than congestionWaitTimeInMs (1000 ms)
    const numberOfThrottles = 2; // throttling
    const algorithm = new CongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    algorithm["currentDegreeOfConcurrency"] = 12;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 7, "decrease factor should be 5");

    // The decrease factor should be min(5, degreeOfConcurrency/2)
    timeTakenInMs += 1000; // should be greater than congestionWaitTimeInMs, will increase after throttle (2000 ms)
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm["currentDegreeOfConcurrency"] = 5;
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 3, "decrease factor should be 2");
    timeTakenInMs += 1000; // should be greater than congestionWaitTimeInMs, will again increase after throttle (3000 ms)
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 2, "decrease factor should be 1");
  });

  it("should not modify degree of concurrency when elapsed time is less than congestionWaitTimeInMs(1000)", () => {
    // should not decrease concurrency even if there is throttling
    let itemsCount = 10;
    const timeTakenInMs = 100;
    let numberOfThrottles = 2;
    const algorithm = new CongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    algorithm["currentDegreeOfConcurrency"] = 10;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 10);

    // should not increase concurrency even if there is no throttling
    itemsCount += 10;
    numberOfThrottles = 0;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 10);
  });

  it("degree of concurrency should not be less than 1", () => {
    const itemsCount = 10;
    const timeTakenInMs = 1100;
    const numberOfThrottles = 2;
    const algorithm = new CongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    algorithm["currentDegreeOfConcurrency"] = 1;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 1, "decrease factor should be 0");
  });

  it("degree of concurrency should not exceed maxDegreeOfConcurrency", () => {
    const itemsCount = 10;
    const timeTakenInMs = 1100;
    const numberOfThrottles = 0;
    const algorithm = new CongestionAlgorithm(limiter, partitionMetric, oldPartitionMetric);
    algorithm["currentDegreeOfConcurrency"] = Constants.BulkMaxDegreeOfConcurrency;
    partitionMetric.add(itemsCount, timeTakenInMs, numberOfThrottles);
    algorithm.run();
    assert.strictEqual(algorithm["currentDegreeOfConcurrency"], 20);
  });
});
