/** @hidden */
export class CountAggregator {
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
    aggregate(other) {
        this.value += other;
    }
    /**
     * Get the aggregation result.
     */
    getResult() {
        return this.value;
    }
}
//# sourceMappingURL=CountAggregator.js.map