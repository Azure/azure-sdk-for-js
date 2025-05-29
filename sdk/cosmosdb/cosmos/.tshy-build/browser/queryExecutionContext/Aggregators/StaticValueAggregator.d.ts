import type { Aggregator } from "./Aggregator.js";
/** @hidden */
export declare class StaticValueAggregator implements Aggregator {
    value: any;
    aggregate(other: unknown): void;
    getResult(): any;
}
//# sourceMappingURL=StaticValueAggregator.d.ts.map