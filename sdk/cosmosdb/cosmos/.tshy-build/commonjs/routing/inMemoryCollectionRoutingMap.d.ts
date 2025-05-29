import type { PartitionKeyRange } from "../client/index.js";
import { QueryRange } from "./QueryRange.js";
/** @hidden */
export declare class InMemoryCollectionRoutingMap {
    private orderedPartitionKeyRanges;
    private orderedRanges;
    orderedPartitionInfo: unknown;
    /**
     * Represents a InMemoryCollectionRoutingMap Object,
     * Stores partition key ranges in an efficient way with some additional information and provides
     * convenience methods for working with set of ranges.
     */
    constructor(orderedPartitionKeyRanges: PartitionKeyRange[], orderedPartitionInfo: unknown);
    getOrderedParitionKeyRanges(): PartitionKeyRange[];
    getOverlappingRanges(providedQueryRanges: QueryRange | QueryRange[]): PartitionKeyRange[];
}
//# sourceMappingURL=inMemoryCollectionRoutingMap.d.ts.map