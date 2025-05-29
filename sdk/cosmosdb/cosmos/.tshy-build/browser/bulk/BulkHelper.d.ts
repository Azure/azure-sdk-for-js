import type { BulkOperationResult, OperationInput } from "../utils/batch.js";
/**
 * BulkHelper for bulk operations in a container.
 * It maintains one @see {@link HelperPerPartition} for each Partition Key Range, which allows independent execution of requests. Queue based limiters @see {@link LimiterQueue}
 * rate limit requestsbat the helper / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the helper dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */
export declare class BulkHelper {
    private readonly container;
    private readonly clientContext;
    private readonly partitionKeyRangeCache;
    private readonly helpersByPartitionKeyRangeId;
    private options;
    private partitionKeyDefinition;
    private partitionKeyDefinitionPromise;
    private isCancelled;
    private processedOperationCountRef;
    private operationPromisesList;
    private congestionControlTimer;
    private readonly congestionControlDelayInMs;
    private staleRidError;
    private readonly operationsPerSleep;
    private readonly intervalForPartialBatchInMs;
    /**
     * adds operation(s) to the helper
     * @param operationInput - bulk operation or list of bulk operations
     */
    execute(operationInput: OperationInput[]): Promise<BulkOperationResult[]>;
    private addOperation;
    private resolvePartitionKeyRangeId;
    private getRetryPolicy;
    private executeRequest;
    private prepareOperation;
    private reBatchOperation;
    private cancelExecution;
    private getHelperForPKRange;
    private runCongestionControlTimer;
    private refreshPartitionKeyRangeCache;
}
//# sourceMappingURL=BulkHelper.d.ts.map