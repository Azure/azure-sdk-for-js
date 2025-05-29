/** @hidden */
/**
 * Represents an aggregator that collects unique values into a set.
 */
export class MakeSetAggregator {
    constructor() {
        this.value = new Set();
    }
    /**
     * Aggregates the values from another set into the current set.
     * @param other - The set to aggregate.
     */
    aggregate(other) {
        other.forEach((item) => {
            this.value.add(item);
        });
    }
    /**
     * Gets the result of the MakeSetAggregator.
     * @returns A Set containing the unique values collected by the aggregator.
     */
    getResult() {
        return Array.from(this.value);
    }
}
//# sourceMappingURL=MakeSetAggregator.js.map