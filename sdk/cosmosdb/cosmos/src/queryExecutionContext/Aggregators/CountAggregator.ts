// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export class CountAggregator implements Aggregator {
  public value: number;
  /**
   * Represents an aggregator for COUNT operator.
   * @constructor CountAggregator
   * @ignore
   */
  constructor() {
    this.value = 0;
  }
  /**
   * Add the provided item to aggregation result.
   * @memberof CountAggregator
   * @instance
   * @param other
   */
  public aggregate(other: number) {
    this.value += other;
  }

  /**
   * Get the aggregation result.
   * @memberof CountAggregator
   * @instance
   */
  public getResult() {
    return this.value;
  }
}
