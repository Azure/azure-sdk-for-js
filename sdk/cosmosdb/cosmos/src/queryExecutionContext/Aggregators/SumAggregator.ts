// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export class SumAggregator implements Aggregator {
  public sum: number;
  /**
   * Add the provided item to aggregation result.
   */
  public aggregate(other: number): void {
    if (other === undefined) {
      return;
    }
    if (this.sum === undefined) {
      this.sum = other;
    } else {
      this.sum += other;
    }
  }

  /**
   * Get the aggregation result.
   */
  public getResult(): number {
    return this.sum;
  }
}
