// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants.js";
import type { PartitionMetric } from "./PartitionMetric.js";
import type { LimiterQueue } from "./Limiter.js";

/**
 * This class implements a congestion control algorithm which dynamically adjusts the degree
 * of concurrency based on the throttling and number of processed items.
 * For example, if it sees any throttling in requests from the last time the algorithm ran, it will decrease the
 * degree of concurrency (either by a factor of 5 or half the current degree of concurrency, whichever is smaller)
 * and increase the wait time to run the algorithm again by 1 second.
 * If it sees no throttling and the number of items processed increased, it will increase the degree of concurrency
 * (by a factor of 1) which cannot exceed the max degree of concurrency (Min(20, concurrency set by user)).
 * It uses the @see {@link PartitionMetric} to capture the metrics.
 * @hidden
 */

export class CongestionAlgorithm {
  // The semaphore to control the degree of concurrency.
  private limiterQueue: LimiterQueue;
  // captures metrics upto previous requests for a partition.
  private oldPartitionMetric: PartitionMetric;
  // captures metrics upto current request for a partition.
  private partitionMetric: PartitionMetric;
  // time to wait before adjusting the degree of concurrency.
  private congestionWaitTimeInMs: number = 1000;
  private congestionIncreaseFactor: number = 1;
  private congestionDecreaseFactor: number = 5;
  private currentDegreeOfConcurrency: number;

  constructor(
    limiterQueue: LimiterQueue,
    partitionMetric: PartitionMetric,
    oldPartitionMetric: PartitionMetric,
  ) {
    this.limiterQueue = limiterQueue;
    this.oldPartitionMetric = oldPartitionMetric;
    this.partitionMetric = partitionMetric;
    this.currentDegreeOfConcurrency = 1;
  }

  run(): void {
    const elapsedTimeInMs =
      this.partitionMetric.timeTakenInMs - this.oldPartitionMetric.timeTakenInMs;

    if (elapsedTimeInMs >= this.congestionWaitTimeInMs) {
      const diffThrottle =
        this.partitionMetric.numberOfThrottles - this.oldPartitionMetric.numberOfThrottles;
      const changeItemsCount =
        this.partitionMetric.numberOfItemsOperatedOn -
        this.oldPartitionMetric.numberOfItemsOperatedOn;

      this.oldPartitionMetric.add(changeItemsCount, elapsedTimeInMs, diffThrottle);
      // if the number of throttles increased, decrease the degree of concurrency.
      if (diffThrottle > 0) {
        this.decreaseConcurrency();
      }
      // if there's no throttling and the number of items processed increased, increase the degree of concurrency.
      if (changeItemsCount > 0 && diffThrottle === 0) {
        this.increaseConcurrency();
      }
    }
  }

  private decreaseConcurrency(): void {
    // decrease should not lead the degree of concurrency as 0.
    const decreaseCount = Math.min(
      this.congestionDecreaseFactor,
      Math.floor(this.currentDegreeOfConcurrency / 2),
    );
    this.currentDegreeOfConcurrency -= decreaseCount;
    this.limiterQueue.setConcurrency(this.currentDegreeOfConcurrency);
    // In case of throttling increase the wait time to adjust the degree of concurrency.
    this.congestionWaitTimeInMs += 1000;
  }

  private increaseConcurrency(): void {
    if (
      this.currentDegreeOfConcurrency + this.congestionIncreaseFactor <=
      Constants.BulkMaxDegreeOfConcurrency
    ) {
      this.currentDegreeOfConcurrency += this.congestionIncreaseFactor;
      this.limiterQueue.setConcurrency(this.currentDegreeOfConcurrency);
    }
  }
}
