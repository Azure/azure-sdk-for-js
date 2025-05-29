import type { ClientContext } from "../ClientContext.js";
import type { FeedOptions, Response } from "../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare enum ParallelQueryExecutionContextBaseStates {
    started = "started",
    inProgress = "inProgress",
    ended = "ended"
}
/** @hidden */
export declare abstract class ParallelQueryExecutionContextBase implements ExecutionContext {
    private clientContext;
    private collectionLink;
    private query;
    private options;
    private partitionedQueryExecutionInfo;
    private correlatedActivityId;
    private err;
    private state;
    private static STATES;
    private routingProvider;
    protected sortOrders: any;
    private requestContinuation;
    private respHeaders;
    private unfilledDocumentProducersQueue;
    private bufferedDocumentProducersQueue;
    private buffer;
    private sem;
    private diagnosticNodeWrapper;
    /**
     * Provides the ParallelQueryExecutionContextBase.
     * This is the base class that ParallelQueryExecutionContext and OrderByQueryExecutionContext will derive from.
     *
     * When handling a parallelized query, it instantiates one instance of
     * DocumentProcuder per target partition key range and aggregates the result of each.
     *
     * @param clientContext - The service endpoint to use to create the client.
     * @param collectionLink - The Collection Link
     * @param options - Represents the feed options.
     * @param partitionedQueryExecutionInfo - PartitionedQueryExecutionInfo
     * @hidden
     */
    constructor(clientContext: ClientContext, collectionLink: string, query: string | SqlQuerySpec, options: FeedOptions, partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo, correlatedActivityId: string);
    protected abstract documentProducerComparator(dp1: DocumentProducer, dp2: DocumentProducer): number;
    private _mergeWithActiveResponseHeaders;
    private _getAndResetActiveResponseHeaders;
    private getDiagnosticNode;
    private _onTargetPartitionRanges;
    /**
     * Gets the replacement ranges for a partitionkeyrange that has been split
     */
    private _getReplacementPartitionKeyRanges;
    private _enqueueReplacementDocumentProducers;
    private static _needPartitionKeyRangeCacheRefresh;
    /**
     * Determine if there are still remaining resources to processs based on the value of the continuation
     * token or the elements remaining on the current batch in the QueryIterator.
     * @returns true if there is other elements to process in the ParallelQueryExecutionContextBase.
     */
    hasMoreResults(): boolean;
    /**
     * Creates target partition range Query Execution Context
     */
    private _createTargetPartitionQueryExecutionContext;
    protected drainBufferedItems(): Promise<Response<any>>;
    /**
     * Buffers document producers based on the maximum degree of parallelism.
     * Moves document producers from the unfilled queue to the buffered queue.
     * @param diagnosticNode - The diagnostic node for logging and tracing.
     * @returns A promise that resolves when buffering is complete.
     */
    protected bufferDocumentProducers(diagnosticNode?: DiagnosticNodeInternal): Promise<void>;
    /**
     * Drains the buffer of filled document producers and appends their items to the main buffer.
     * @param isOrderBy - Indicates if the query is an order by query.
     * @returns A promise that resolves when the buffer is filled.
     */
    protected fillBufferFromBufferQueue(isOrderBy?: boolean): Promise<void>;
    private updateStates;
}
//# sourceMappingURL=parallelQueryExecutionContextBase.d.ts.map