import type { QueryInfo, Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by distinct query.
 */
export declare class NonStreamingOrderByDistinctEndpointComponent implements ExecutionContext {
    private executionContext;
    private queryInfo;
    private priorityQueueBufferSize;
    private emitRawOrderByPayload;
    /**
     * A Map that holds the distinct values of the items before storing in priority queue.
     */
    private aggregateMap;
    /**
     * A priority queue to compute the final sorted results.
     */
    private nonStreamingOrderByPQ;
    /**
     * Array to store the final sorted results.
     */
    private finalResultArray;
    private sortOrders;
    /**
     * Flag to determine if all results are fetched from backend and results can be returned.
     */
    private isCompleted;
    constructor(executionContext: ExecutionContext, queryInfo: QueryInfo, priorityQueueBufferSize: number, emitRawOrderByPayload?: boolean);
    /**
     * Build final sorted result array from which responses will be served.
     */
    private buildFinalResultArray;
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
}
//# sourceMappingURL=NonStreamingOrderByDistinctEndpointComponent.d.ts.map