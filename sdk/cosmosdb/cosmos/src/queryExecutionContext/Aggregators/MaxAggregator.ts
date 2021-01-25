// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator";
import { Aggregator } from "./Aggregator";

interface MaxAggregateResult {
  count: number;
  max?: number;
}

/** @hidden */
export class MaxAggregator implements Aggregator {
  private value: number;
  private comparer: OrderByDocumentProducerComparator;
  /**
   * Represents an aggregator for MAX operator.
   * @constructor MaxAggregator
   * @ignore
   */
  constructor() {
    this.value = undefined;
    this.comparer = new OrderByDocumentProducerComparator(["Ascending"]);
  }
  /**
   * Add the provided item to aggregation result.
   * @memberof MaxAggregator
   * @instance
   * @param other
   */
  public aggregate(other: MaxAggregateResult) {
    if (this.value === undefined) {
      this.value = other.max;
    } else if (
      this.comparer.compareValue(other.max, typeof other.max, this.value, typeof this.value) > 0
    ) {
      this.value = other.max;
    }
  }

  /**
   * Get the aggregation result.
   * @memberof MaxAggregator
   * @instance
   */
  public getResult() {
    return this.value;
  }
}
