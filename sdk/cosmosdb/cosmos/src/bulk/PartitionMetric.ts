// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import semaphore from "semaphore";

/**
 * Captures the metrics for the requests made for bulk.
 */
export class PartitionMetric {
  numberOfItemsOperatedOn: number;
  timeTakenInMs: number;
  numberOfThrottles: number;
  private semaphore: semaphore.Semaphore;

  constructor() {
    this.numberOfItemsOperatedOn = 0;
    this.timeTakenInMs = 0;
    this.numberOfThrottles = 0;
    this.semaphore = semaphore(1);
  }

  add(numberOfDoc: number, timeTakenInMs: number, numOfThrottles: number): void {
    // these operations should be atomic as multiple dispatch could be updating these values
    this.semaphore.take(() => {
      try {
        this.numberOfItemsOperatedOn += numberOfDoc;
        this.timeTakenInMs += timeTakenInMs;
        this.numberOfThrottles += numOfThrottles;
      } finally {
        this.semaphore.leave();
      }
    });
  }
}
