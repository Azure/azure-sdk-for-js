import type { Aggregator } from "./Aggregator.js";
/** @hidden */
export declare class CountAggregator implements Aggregator {
    value: number;
    /**
     * Represents an aggregator for COUNT operator.
     * @hidden
     */
    constructor();
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other: number): void;
    /**
     * Get the aggregation result.
     */
    getResult(): number;
}
//# sourceMappingURL=CountAggregator.d.ts.map