import type { Aggregator } from "./Aggregator.js";
/** @hidden */
/**
 * Represents an aggregator that collects unique values into a set.
 */
export declare class MakeSetAggregator implements Aggregator {
    value: Set<any>;
    constructor();
    /**
     * Aggregates the values from another set into the current set.
     * @param other - The set to aggregate.
     */
    aggregate(other: any[]): void;
    /**
     * Gets the result of the MakeSetAggregator.
     * @returns A Set containing the unique values collected by the aggregator.
     */
    getResult(): any;
}
//# sourceMappingURL=MakeSetAggregator.d.ts.map