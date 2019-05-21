import { OrderByDocumentProducerComparator } from "../orderByDocumentProducerComparator";
import { IAggregator } from "./IAggregator";

/** @hidden */
export class MinAggregator implements IAggregator<number> {
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
  public aggregate(other: number) {
    if (this.value === undefined) {
      this.value = other;
    } else {
      const otherType = other == null ? "NoValue" : typeof other;
      if (this.comparer.compareValue(other, otherType, this.value, typeof this.value) < 0) {
        this.value = other;
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
