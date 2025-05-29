import type { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel.js";
import type { EncryptionProcessor } from "../encryption/EncryptionProcessor.js";
import type { ClientConfigDiagnostic, DiagnosticNodeInternal } from "../index.js";
import type { ExecuteCallback, RetryCallback } from "../utils/batch.js";
import type { ItemOperation } from "./index.js";
/**
 * Handles operations batching and queuing for dispatch. Fills batches efficiently. There is always one batch at a time being filled. When the batch is full, it is added to the
 * dispatch queue and a new batch is created.
 * @hidden
 */
export declare class HelperPerPartition {
    private readonly executor;
    private readonly retrier;
    private currentBatcher;
    private readonly lock;
    private readonly partitionMetric;
    private readonly oldPartitionMetric;
    private readonly diagnosticLevel;
    private readonly encryptionEnabled;
    private readonly encryptionProcessor;
    private readonly clientConfigDiagnostics;
    private readonly congestionControlAlgorithm;
    private readonly dispatchLimiterQueue;
    private initialConcurrency;
    private processedOperationCountRef;
    constructor(executor: ExecuteCallback, retrier: RetryCallback, refreshpartitionKeyRangeCache: (diagnosticNode: DiagnosticNodeInternal) => Promise<void>, diagnosticLevel: CosmosDbDiagnosticLevel, encryptionEnabled: boolean, clientConfig: ClientConfigDiagnostic, encryptionProcessor: EncryptionProcessor, processedOperationCountRef: {
        count: number;
    });
    /**
     * Enqueues an operation into the current batch.
     * If the operation does not fit because the batch is full, the full batch is enqueued in the dispatch queue
     * and a new batch is created. The promise resolves when the operation has been successfully added.
     */
    add(operation: ItemOperation): Promise<void>;
    /**
     * @returns the batch to be dispatched and creates a new one
     */
    private getBatchToQueueAndCreate;
    /**
     * In case there are leftover operations that did not fill a full batch,
     * dispatchUnfilledBatch will add those operations as a batch in the dispatch queue.
     */
    addPartialBatchToQueue(): void;
    private createBatcher;
    /**
     * Runs congestion algo for a partition.
     * Controlled by a single timer for all the partitions.
     */
    runCongestionAlgorithm(): void;
    /**
     * Empties the dispatch queue and clears the current batch.
     * This is used in case of stale container Rid detected for encryption operations
     */
    dispose(): Promise<void>;
}
//# sourceMappingURL=HelperPerPartition.d.ts.map