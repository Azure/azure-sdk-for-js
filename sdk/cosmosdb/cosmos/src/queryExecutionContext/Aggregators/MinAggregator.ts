// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator";
import { Aggregator } from "./Aggregator";

export interface MinAggregateResult {
  min: number;
  count: number;
}

/** @hidden */
export class MinAggregator implements Aggregator {
  private value: number;
  private comparer: OrderByDocumentProducerComparator;
  /**
   * Represents an aggregator for MIN operator.
   * @constructor MinAggregator
   * @ignore
   */
  constructor() {
    this.value = undefined;
    this.comparer = new OrderByDocumentProducerComparator(["Ascending"]);
  }
  /**
   * Add the provided item to aggregation result.
   * @memberof MinAggregator
   * @instance
   * @param other
   */
  public aggregate(other: MinAggregateResult) {
    if (this.value === undefined) {
      // || typeof this.value === "object"
      this.value = other.min;
    } else {
      const otherType = other.min === null ? "NoValue" : typeof other.min; // || typeof other === "object"
      const thisType = this.value === null ? "NoValue" : typeof this.value;
      if (this.comparer.compareValue(other.min, otherType, this.value, thisType) < 0) {
        this.value = other.min;
      }
    }
  }

  /**
   * Get the aggregation result.
   * @memberof MinAggregator
   * @instance
   */
  public getResult() {
    return this.value;
  }
}
