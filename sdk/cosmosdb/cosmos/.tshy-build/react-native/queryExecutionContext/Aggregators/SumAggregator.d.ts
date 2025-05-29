import type { Aggregator } from "./Aggregator.js";
/** @hidden */
export declare class SumAggregator implements Aggregator {
    sum: number;
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other: number): void;
    /**
     * Get the aggregation result.
     */
    getResult(): number;
}
//# sourceMappingURL=SumAggregator.d.ts.map