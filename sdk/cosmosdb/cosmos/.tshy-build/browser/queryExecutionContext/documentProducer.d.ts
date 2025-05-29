import type { PartitionKeyRange } from "../client/index.js";
import type { ClientContext } from "../ClientContext.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { FeedOptions } from "../request/index.js";
import type { Response } from "../request/index.js";
import type { FetchFunctionCallback } from "./defaultQueryExecutionContext.js";
import { FetchResult } from "./FetchResult.js";
import type { SqlQuerySpec } from "./index.js";
/** @hidden */
export declare class DocumentProducer {
    private clientContext;
    private collectionLink;
    private query;
    targetPartitionKeyRange: PartitionKeyRange;
    fetchResults: FetchResult[];
    allFetched: boolean;
    private err;
    previousContinuationToken: string;
    continuationToken: string;
    generation: number;
    private respHeaders;
    private internalExecutionContext;
    startEpk: string;
    endEpk: string;
    populateEpkRangeHeaders: boolean;
    /**
     * Provides the Target Partition Range Query Execution Context.
     * @param clientContext  - The service endpoint to use to create the client.
     * @param collectionLink - Represents collection link
     * @param query          - A SQL query.
     * @param targetPartitionKeyRange - Query Target Partition key Range
     * @hidden
     */
    constructor(clientContext: ClientContext, collectionLink: string, query: SqlQuerySpec, targetPartitionKeyRange: PartitionKeyRange, options: FeedOptions, correlatedActivityId: string, startEpk?: string, endEpk?: string, populateEpkRangeHeaders?: boolean);
    peekBufferedItems(): any[];
    fetchFunction: FetchFunctionCallback;
    hasMoreResults(): boolean;
    gotSplit(): boolean;
    private _getAndResetActiveResponseHeaders;
    private _updateStates;
    private static _needPartitionKeyRangeCacheRefresh;
    /**
     * Fetches and bufferes the next page of results in internal buffer
     */
    bufferMore(diagnosticNode: DiagnosticNodeInternal): Promise<void>;
    getTargetParitionKeyRange(): PartitionKeyRange;
    /**
     * Peak the next item in the buffer
     */
    peakNextItem(): any;
    /**
     * Returns the first item in the buffered results if any, or [] otherwise.
     */
    fetchNextItem(): Promise<Response<any>>;
    /**
     * Fetches all the buffered results
     */
    fetchBufferedItems(): Promise<Response<any[]>>;
    /**
     * Retrieve the current element on the DocumentProducer.
     */
    private current;
}
//# sourceMappingURL=documentProducer.d.ts.map