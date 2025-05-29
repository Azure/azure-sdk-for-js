// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import semaphore from "semaphore";
import { StatusCodes } from "../common/statusCodes.js";
import { Batcher } from "./Batcher.js";
import { CongestionAlgorithm } from "./CongestionAlgorithm.js";
import { PartitionMetric } from "./PartitionMetric.js";
import { LimiterQueue } from "./Limiter.js";
/**
 * Handles operations batching and queuing for dispatch. Fills batches efficiently. There is always one batch at a time being filled. When the batch is full, it is added to the
 * dispatch queue and a new batch is created.
 * @hidden
 */
export class HelperPerPartition {
    constructor(executor, retrier, refreshpartitionKeyRangeCache, diagnosticLevel, encryptionEnabled, clientConfig, encryptionProcessor, processedOperationCountRef) {
        this.initialConcurrency = 1;
        this.executor = executor;
        this.retrier = retrier;
        this.diagnosticLevel = diagnosticLevel;
        this.encryptionEnabled = encryptionEnabled;
        this.encryptionProcessor = encryptionProcessor;
        this.clientConfigDiagnostics = clientConfig;
        this.oldPartitionMetric = new PartitionMetric();
        this.partitionMetric = new PartitionMetric();
        this.processedOperationCountRef = processedOperationCountRef;
        this.lock = semaphore(1);
        this.dispatchLimiterQueue = new LimiterQueue(this.initialConcurrency, this.partitionMetric, this.retrier, refreshpartitionKeyRangeCache);
        this.congestionControlAlgorithm = new CongestionAlgorithm(this.dispatchLimiterQueue, this.partitionMetric, this.oldPartitionMetric);
        this.currentBatcher = this.createBatcher();
    }
    /**
     * Enqueues an operation into the current batch.
     * If the operation does not fit because the batch is full, the full batch is enqueued in the dispatch queue
     * and a new batch is created. The promise resolves when the operation has been successfully added.
     */
    async add(operation) {
        return new Promise((resolve, reject) => {
            this.lock.take(() => {
                try {
                    // If the current batch is full, move it to the dispatch queue until the operation fits.
                    while (!this.currentBatcher.tryAdd(operation)) {
                        const fullBatch = this.getBatchToQueueAndCreate();
                        if (fullBatch) {
                            this.dispatchLimiterQueue.push(fullBatch);
                        }
                    }
                    // At this point the operation was added.
                    resolve();
                }
                catch (err) {
                    const response = {
                        operationInput: operation.unencryptedOperationInput,
                        error: Object.assign(new Error(err.message), {
                            code: StatusCodes.InternalServerError,
                            diagnostics: operation.operationContext.diagnosticNode.toDiagnostic(this.clientConfigDiagnostics),
                        }),
                    };
                    operation.operationContext.fail(response);
                    this.processedOperationCountRef.count++;
                    reject(err);
                }
                finally {
                    this.lock.leave();
                }
            });
        });
    }
    /**
     * @returns the batch to be dispatched and creates a new one
     */
    getBatchToQueueAndCreate() {
        if (this.currentBatcher.isEmpty())
            return null;
        const previousBatcher = this.currentBatcher;
        this.currentBatcher = this.createBatcher();
        return previousBatcher;
    }
    /**
     * In case there are leftover operations that did not fill a full batch,
     * dispatchUnfilledBatch will add those operations as a batch in the dispatch queue.
     */
    addPartialBatchToQueue() {
        this.lock.take(() => {
            try {
                if (!this.currentBatcher.isEmpty()) {
                    const batch = this.currentBatcher;
                    this.currentBatcher = this.createBatcher();
                    this.dispatchLimiterQueue.push(batch);
                }
            }
            finally {
                this.lock.leave();
            }
        });
    }
    createBatcher() {
        return new Batcher(this.dispatchLimiterQueue, this.executor, this.retrier, this.diagnosticLevel, this.encryptionEnabled, this.clientConfigDiagnostics, this.encryptionProcessor, this.processedOperationCountRef);
    }
    /**
     * Runs congestion algo for a partition.
     * Controlled by a single timer for all the partitions.
     */
    runCongestionAlgorithm() {
        this.congestionControlAlgorithm.run();
    }
    /**
     * Empties the dispatch queue and clears the current batch.
     * This is used in case of stale container Rid detected for encryption operations
     */
    async dispose() {
        await this.dispatchLimiterQueue.pauseAndClear(null);
        this.currentBatcher = undefined;
    }
}
//# sourceMappingURL=HelperPerPartition.js.map