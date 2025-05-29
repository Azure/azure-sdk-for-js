"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountAggregator = void 0;
/** @hidden */
class CountAggregator {
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
exports.CountAggregator = CountAggregator;
//# sourceMappingURL=CountAggregator.js.map