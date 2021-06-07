// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export class CountAggregator implements Aggregator {
  public value: number;
  /**
   * Represents an aggregator for COUNT operator.
   * @hidden
   */
  constructor() {
    this.value = 0;
  }
  /**
   * Add the provided item to aggregation result.
   */
  public aggregate(other: number): void {
    this.value += other;
  }

  /**
   * Get the aggregation result.
   */
  public getResult(): number {
    return this.value;
  }
}
