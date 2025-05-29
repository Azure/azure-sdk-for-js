import type { Aggregator } from "./Aggregator.js";
/** @hidden */
export interface AverageAggregateResult {
    sum: number;
    count: number;
}
/** @hidden */
export declare class AverageAggregator implements Aggregator {
    sum: number;
    count: number;
    /**
     * Add the provided item to aggregation result.
     */
    aggregate(other: AverageAggregateResult): void;
    /**
     * Get the aggregation result.
     */
    getResult(): number;
}
//# sourceMappingURL=AverageAggregator.d.ts.map