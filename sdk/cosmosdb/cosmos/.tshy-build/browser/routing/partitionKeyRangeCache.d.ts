import type { PartitionKeyRange } from "../client/Container/PartitionKeyRange.js";
import type { ClientContext } from "../ClientContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { InMemoryCollectionRoutingMap } from "./inMemoryCollectionRoutingMap.js";
import type { QueryRange } from "./QueryRange.js";
/** @hidden */
export declare class PartitionKeyRangeCache {
    private clientContext;
    private collectionRoutingMapByCollectionId;
    constructor(clientContext: ClientContext);
    /**
     * Finds or Instantiates the requested Collection Routing Map
     * @param collectionLink - Requested collectionLink
     * @hidden
     */
    onCollectionRoutingMap(collectionLink: string, diagnosticNode: DiagnosticNodeInternal, forceRefresh?: boolean): Promise<InMemoryCollectionRoutingMap>;
    /**
     * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
     * @hidden
     */
    getOverlappingRanges(collectionLink: string, queryRange: QueryRange, diagnosticNode: DiagnosticNodeInternal, forceRefresh?: boolean): Promise<PartitionKeyRange[]>;
    private requestCollectionRoutingMap;
}
//# sourceMappingURL=partitionKeyRangeCache.d.ts.map