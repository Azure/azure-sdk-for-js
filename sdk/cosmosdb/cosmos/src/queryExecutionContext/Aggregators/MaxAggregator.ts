// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator.js";
import type { Aggregator } from "./Aggregator.js";

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
   * @hidden
   */
  constructor() {
    this.value = undefined;
    this.comparer = new OrderByDocumentProducerComparator(["Ascending"]);
  }
  /**
   * Add the provided item to aggregation result.
   */
  public aggregate(other: MaxAggregateResult): void {
    // Skip aggregation if other.max is undefined (empty partition with count:0)
    if (other.max === undefined) {
      return;
    }

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
   */
  public getResult(): number {
    return this.value;
  }
}
