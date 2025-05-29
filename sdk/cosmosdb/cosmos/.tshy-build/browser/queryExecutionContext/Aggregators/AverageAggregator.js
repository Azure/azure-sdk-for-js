/** @hidden */
export class AverageAggregator {
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other) {
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
     */
    getResult() {
        if (this.sum == null || this.count <= 0) {
            return undefined;
        }
        return this.sum / this.count;
    }
}
//# sourceMappingURL=AverageAggregator.js.map