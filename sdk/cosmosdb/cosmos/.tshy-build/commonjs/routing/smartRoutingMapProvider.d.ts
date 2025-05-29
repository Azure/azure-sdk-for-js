import type { ClientContext } from "../ClientContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { QueryRange } from "./QueryRange.js";
/** @hidden */
export declare const PARITIONKEYRANGE: import("../common/constants.js").PartitionKeyRangePropertiesNames;
/** @hidden */
export declare class SmartRoutingMapProvider {
    private partitionKeyRangeCache;
    constructor(clientContext: ClientContext);
    private static _secondRangeIsAfterFirstRange;
    private static _isSortedAndNonOverlapping;
    private static _stringMax;
    private static _stringCompare;
    private static _subtractRange;
    /**
     * Given the sorted ranges and a collection, invokes the callback on the list of overlapping partition key ranges
     * @param callback - Function execute on the overlapping partition key ranges result,
     *                   takes two parameters error, partition key ranges
     * @hidden
     */
    getOverlappingRanges(collectionLink: string, sortedRanges: QueryRange[], diagnosticNode: DiagnosticNodeInternal): Promise<any[]>;
}
//# sourceMappingURL=smartRoutingMapProvider.d.ts.map