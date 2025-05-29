import type { Aggregator } from "./Aggregator.js";
interface MaxAggregateResult {
    count: number;
    max?: number;
}
/** @hidden */
export declare class MaxAggregator implements Aggregator {
    private value;
    private comparer;
    /**
     * Represents an aggregator for MAX operator.
     * @hidden
     */
    constructor();
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other: MaxAggregateResult): void;
    /**
     * Get the aggregation result.
     */
    getResult(): number;
}
export {};
//# sourceMappingURL=MaxAggregator.d.ts.map