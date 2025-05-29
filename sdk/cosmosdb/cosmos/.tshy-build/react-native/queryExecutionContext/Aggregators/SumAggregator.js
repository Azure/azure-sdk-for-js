/** @hidden */
export class SumAggregator {
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other) {
        if (other === undefined) {
            return;
        }
        if (this.sum === undefined) {
            this.sum = other;
        }
        else {
            this.sum += other;
        }
    }
    /**
     * Get the aggregation result.
     */
    getResult() {
        return this.sum;
    }
}
//# sourceMappingURL=SumAggregator.js.map