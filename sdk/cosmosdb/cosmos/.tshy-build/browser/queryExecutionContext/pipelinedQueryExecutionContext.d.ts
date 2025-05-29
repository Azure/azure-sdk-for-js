import type { ClientContext } from "../ClientContext.js";
import type { Response, FeedOptions } from "../request/index.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
/** @hidden */
export declare class PipelinedQueryExecutionContext implements ExecutionContext {
    private clientContext;
    private collectionLink;
    private query;
    private options;
    private partitionedQueryExecutionInfo;
    private emitRawOrderByPayload;
    private fetchBuffer;
    private fetchMoreRespHeaders;
    private endpoint;
    private pageSize;
    private vectorSearchBufferSize;
    private static DEFAULT_PAGE_SIZE;
    private static DEFAULT_MAX_VECTOR_SEARCH_BUFFER_SIZE;
    private nonStreamingOrderBy;
    constructor(clientContext: ClientContext, collectionLink: string, query: string | SqlQuerySpec, options: FeedOptions, partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo, correlatedActivityId: string, emitRawOrderByPayload?: boolean);
    hasMoreResults(): boolean;
    fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>>;
    private _fetchMoreImplementation;
    private calculateVectorSearchBufferSize;
    private checkQueryConstraints;
}
//# sourceMappingURL=pipelinedQueryExecutionContext.d.ts.map