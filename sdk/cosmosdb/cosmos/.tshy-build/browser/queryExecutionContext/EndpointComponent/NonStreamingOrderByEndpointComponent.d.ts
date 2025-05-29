import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by query.
 */
export declare class NonStreamingOrderByEndpointComponent implements ExecutionContext {
    private executionContext;
    private sortOrders;
    private priorityQueueBufferSize;
    private offset;
    private emitRawOrderByPayload;
    /**
     * A priority queue to store the final sorted results.
     */
    private nonStreamingOrderByPQ;
    /**
     * Flag to determine if all results are fetched from backend and results can be returned from priority queue.
     */
    private isCompleted;
    /**
     * Represents an endpoint in handling an non-streaming order by query. For each processed orderby
     * result it returns 'payload' item of the result
     *
     * @param executionContext - Underlying Execution Context
     * @hidden
     */
    constructor(executionContext: ExecutionContext, sortOrders: any[], priorityQueueBufferSize: number, offset?: number, emitRawOrderByPayload?: boolean);
    /**
     * Determine if there are still remaining resources to processs.
     * @returns true if there is other elements to process in the NonStreamingOrderByEndpointComponent.
     */
    hasMoreResults(): boolean;
    /**
     * Fetches the next batch of the result from the target container.
     * @param diagnosticNode - The diagnostic information for the request.
     */
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>>;
    private buildFinalResultArray;
}
//# sourceMappingURL=NonStreamingOrderByEndpointComponent.d.ts.map