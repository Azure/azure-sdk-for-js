import type { Aggregator } from "./Aggregator.js";
export interface MinAggregateResult {
    min: number;
    count: number;
}
/** @hidden */
export declare class MinAggregator implements Aggregator {
    private value;
    private comparer;
    /**
     * Represents an aggregator for MIN operator.
     * @hidden
     */
    constructor();
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other: MinAggregateResult): void;
    /**
     * Get the aggregation result.
     */
    getResult(): number;
}
//# sourceMappingURL=MinAggregator.d.ts.map