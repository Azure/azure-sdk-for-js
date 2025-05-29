import { OrderByDocumentProducerComparator } from "./orderByDocumentProducerComparator.js";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase.js";
/** @hidden */
export class OrderByQueryExecutionContext extends ParallelQueryExecutionContextBase {
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
    constructor(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo, correlatedActivityId) {
        // Calling on base class constructor
        super(clientContext, collectionLink, query, options, partitionedQueryExecutionInfo, correlatedActivityId);
        this.orderByComparator = new OrderByDocumentProducerComparator(this.sortOrders);
    }
    // Instance members are inherited
    // Overriding documentProducerComparator for OrderByQueryExecutionContexts
    /**
     * Provides a Comparator for document producers which respects orderby sort order.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1, docProd2) {
        return this.orderByComparator.compare(docProd1, docProd2);
    }
    /**
     * Fetches more results from the query execution context.
     * @param diagnosticNode - Optional diagnostic node for tracing.
     * @returns A promise that resolves to the fetched results.
     * @hidden
     */
    async fetchMore(diagnosticNode) {
        try {
            await this.bufferDocumentProducers(diagnosticNode);
            await this.fillBufferFromBufferQueue(true);
            return this.drainBufferedItems();
        }
        catch (error) {
            console.error("Error fetching more results:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=orderByQueryExecutionContext.js.map