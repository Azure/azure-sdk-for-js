import type { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel.js";
import type { EncryptionProcessor } from "../encryption/EncryptionProcessor.js";
import type { ClientConfigDiagnostic } from "../index.js";
import type { ExecuteCallback, RetryCallback } from "../utils/batch.js";
import type { PartitionMetric } from "./PartitionMetric.js";
import type { ItemOperation } from "./index.js";
import type { LimiterQueue } from "./Limiter.js";
/**
 * Maintains a batch of operations and dispatches it as a unit of work.
 * Execution of the request is done by the @see {@link ExecuteCallback} and retry is done by the @see {@link RetryCallback}.
 * @hidden
 */
export declare class Batcher {
    private batchOperationsList;
    private currentSize;
    private toBeDispatched;
    private readonly executor;
    private readonly retrier;
    private readonly diagnosticLevel;
    private readonly encryptionEnabled;
    private readonly encryptionProcessor;
    private readonly clientConfigDiagnostics;
    private readonly limiter;
    private processedOperationCountRef;
    constructor(limiter: LimiterQueue, executor: ExecuteCallback, retrier: RetryCallback, diagnosticLevel: CosmosDbDiagnosticLevel, encryptionEnabled: boolean, clientConfig: ClientConfigDiagnostic, encryptionProcessor: EncryptionProcessor, processedOperationCountRef: {
        count: number;
    });
    /**
     * Attempts to add an operation to the current batch.
     * Returns false if the batch is full or already dispatched.
     */
    tryAdd(operation: ItemOperation): boolean;
    isEmpty(): boolean;
    /**
     * Dispatches the current batch of operations.
     * Handles retries for failed operations and updates the ordered response.
     */
    dispatch(partitionMetric: PartitionMetric): Promise<void>;
    getOperations(): ItemOperation[];
}
//# sourceMappingURL=Batcher.d.ts.map