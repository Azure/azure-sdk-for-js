// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
/**
 * Represents an aggregator that collects unique values into a set.
 */
export class MakeSetAggregator implements Aggregator {
  value: Set<any>;

  constructor() {
    this.value = new Set();
  }

  /**
   * Aggregates the values from another set into the current set.
   * @param other The set to aggregate.
   */
  public aggregate(other: Set<any>): void {
    other.forEach((item) => {
      this.value.add(item);
    });
  }

  /**
   * Gets the result of the MakeSetAggregator.
   * @returns A Set containing the unique values collected by the aggregator.
   */
  public getResult(): any {
    return Array.from(this.value);
  }
}
