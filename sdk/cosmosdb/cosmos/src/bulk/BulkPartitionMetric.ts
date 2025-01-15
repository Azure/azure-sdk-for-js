// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Captures the metrics for the requests made for bulk.
 */
export class BulkPartitionMetric {
  numberOfItemsOperatedOn: number;
  timeTakenInMs: number;
  numberOfThrottles: number;

  constructor() {
    this.numberOfItemsOperatedOn = 0;
    this.timeTakenInMs = 0;
    this.numberOfThrottles = 0;
  }

  add(numberOfDoc: number, timeTakenInMs: number, numOfThrottles: number): void {
    this.numberOfItemsOperatedOn += numberOfDoc;
    this.timeTakenInMs += timeTakenInMs;
    this.numberOfThrottles += numOfThrottles;
  }
}
