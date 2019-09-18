import { IAggregator } from "./IAggregator";

/** @hidden */
export interface IAverageAggregator {
  sum: number;
  count: number;
}

/** @hidden */
export class AverageAggregator implements IAverageAggregator, IAggregator<IAverageAggregator> {
  public sum: number;
  public count: number;
  /**
   * Add the provided item to aggregation result.
   * @memberof AverageAggregator
   * @instance
   * @param other
   */
  public aggregate(other: IAverageAggregator) {
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
   * @memberof AverageAggregator
   * @instance
   */
  public getResult() {
    if (this.sum == null || this.count <= 0) {
      return undefined;
    }
    return this.sum / this.count;
  }
}
