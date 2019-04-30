import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator";
import { IAggregator } from "./IAggregator";

/** @hidden */
export class MaxAggregator implements IAggregator<number> {
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
  public aggregate(other: number) {
    if (this.value === undefined) {
      this.value = other;
    } else if (this.comparer.compareValue(other, typeof other, this.value, typeof this.value) > 0) {
      this.value = other;
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
