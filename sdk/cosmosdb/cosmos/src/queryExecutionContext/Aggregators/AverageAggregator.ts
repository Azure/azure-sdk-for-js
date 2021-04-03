// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export interface AverageAggregateResult {
  sum: number;
  count: number;
}

/** @hidden */
export class AverageAggregator implements Aggregator {
  public sum: number;
  public count: number;
  /**
   * Add the provided item to aggregation result.
   */
  public aggregate(other: AverageAggregateResult): void {
    if (other == null || other.sum == null) {
      return;
    }
    if (this.sum == null) {
      this.sum = 0.0;
      this.count = 0;
    }
    this.sum += other.sum;
    this.count += other.count;
  }

  /**
   * Get the aggregation result.
   */
  public getResult(): number {
    if (this.sum == null || this.count <= 0) {
      return undefined;
    }
    return this.sum / this.count;
  }
}
