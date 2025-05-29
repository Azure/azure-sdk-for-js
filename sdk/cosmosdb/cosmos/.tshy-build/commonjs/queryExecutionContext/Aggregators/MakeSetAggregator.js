"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeSetAggregator = void 0;
/** @hidden */
/**
 * Represents an aggregator that collects unique values into a set.
 */
class MakeSetAggregator {
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
exports.MakeSetAggregator = MakeSetAggregator;
//# sourceMappingURL=MakeSetAggregator.js.map