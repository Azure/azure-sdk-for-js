import type { ClientContext } from "../ClientContext.js";
import type { PartitionedQueryExecutionInfo } from "../request/ErrorResponse.js";
import type { FeedOptions } from "../request/FeedOptions.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
import type { SqlQuerySpec } from "./SqlQuerySpec.js";
/** @hidden */
export declare class OrderByQueryExecutionContext extends ParallelQueryExecutionContextBase implements ExecutionContext {
    private orderByComparator;
    /**
     * Provides the OrderByQueryExecutionContext.
     * This class is capable of handling orderby queries and dervives from ParallelQueryExecutionContextBase.
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
    /**
     * Provides a Comparator for document producers which respects orderby sort order.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer): any;
    /**
     * Fetches more results from the query execution context.
     * @param diagnosticNode - Optional diagnostic node for tracing.
     * @returns A promise that resolves to the fetched results.
     * @hidden
     */
    fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<any>;
}
//# sourceMappingURL=orderByQueryExecutionContext.d.ts.map