// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExecuteCallback, RetryCallback } from "../utils/batch";
import { BulkBatcher } from "./BulkBatcher";
import semaphore from "semaphore";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import { BulkPartitionMetric } from "./BulkPartitionMetric";
import type { EncryptionProcessor } from "../encryption";
import type { ClientConfigDiagnostic } from "../CosmosDiagnostics";
import type { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";
import { LimiterQueue } from "./Limiter";
import { BulkCongestionAlgorithm } from "./BulkCongestionAlgorithm";

/**
 * Handles operation queueing and dispatching. Fills batches efficiently and maintains a timer for early dispatching in case of partially-filled batches and to optimize for throughput.
 * There is always one batch at a time being filled. Locking is in place to avoid concurrent threads trying to Add operations while the timer might be Dispatching the current batch.
 * The current batch is dispatched and a new one is readied to be filled by new operations, the dispatched batch runs independently through a fire and forget pattern.
 * @hidden
 */

export class BulkHelperPerPartition {
  private readonly executor: ExecuteCallback;
  private readonly retrier: RetryCallback;
  private currentBatcher: BulkBatcher;
  private readonly lock: semaphore.Semaphore;
  private readonly partitionMetric: BulkPartitionMetric;
  private readonly oldPartitionMetric: BulkPartitionMetric;
  private readonly diagnosticLevel: CosmosDbDiagnosticLevel;
  private readonly encryptionEnabled: boolean;
  private readonly encryptionProcessor: EncryptionProcessor;
  private readonly clientConfigDiagnostics: ClientConfigDiagnostic;
  private readonly congestionControlAlgorithm: BulkCongestionAlgorithm;
  private queuedBatches: BulkBatcher[] = [];
  private readonly dispatchLimiter: LimiterQueue;
  private initialConcurrency: number = 1;
  private operationsCountRef: { processedOperationCount: number, failedOperationCount: number } = { processedOperationCount: 0, failedOperationCount: 0 };


  constructor(
    executor: ExecuteCallback,
    retrier: RetryCallback,
    diagnosticLevel: CosmosDbDiagnosticLevel,
    encryptionEnabled: boolean,
    clientConfig: ClientConfigDiagnostic,
    encryptionProcessor: EncryptionProcessor,
    operationsCountRef: { processedOperationCount: number, failedOperationCount: number } = { processedOperationCount: 0, failedOperationCount: 0 }

  ) {
    this.executor = executor;
    this.retrier = retrier;
    this.diagnosticLevel = diagnosticLevel;
    this.encryptionEnabled = encryptionEnabled;
    this.encryptionProcessor = encryptionProcessor;
    this.clientConfigDiagnostics = clientConfig;
    this.oldPartitionMetric = new BulkPartitionMetric();
    this.partitionMetric = new BulkPartitionMetric();
    this.operationsCountRef = operationsCountRef;
    this.currentBatcher = this.createBulkBatcher();
    this.congestionControlAlgorithm = new BulkCongestionAlgorithm(
      this.dispatchLimiter,
      this.partitionMetric,
      this.oldPartitionMetric,
    );
    this.lock = semaphore(1);
    this.dispatchLimiter = new LimiterQueue(this.initialConcurrency);
  }

  /**
   * Enqueues an operation into the current batch.
   * If the operation does not fit because the batch is full, the full batch is enqueued in the dispatch queue
   * and a new batch is created. The promise resolves when the operation has been successfully added.
   */
  add(operation: ItemBulkOperation): Promise<void> {
    return new Promise((resolve, reject) => {
      this.lock.take(() => {
        try {
          // If the current batch is full, move it to the dispatch queue until the operation fits.
          while (!this.currentBatcher.tryAdd(operation)) {
            const fullBatch = this.getBatchToQueueAndCreate();
            if (fullBatch) {
              this.dispatchLimiter.push(() => fullBatch.dispatch(this.partitionMetric));
            }
          }
          // At this point the operation was added.
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          this.lock.leave();
        }
      });
    });
  }

  /**
   * @returns the batch to be dispatched and creates a new one
   */
  private getBatchToQueueAndCreate(): BulkBatcher {
    if (this.currentBatcher.isEmpty()) return null;
    const previousBatcher = this.currentBatcher;
    this.currentBatcher = this.createBulkBatcher();
    this.queuedBatches.push(previousBatcher);
    return previousBatcher;
  }

  /**
   * In case there are leftover operations that did not fill a full batch,
   * addRemainingBatch will add those operations as a batch in the dispatch queue.
   */
  dispatchUnfilledBatch(): void {
    this.lock.take(() => {
      try {
        if (!this.currentBatcher.isEmpty()) {
          const batch = this.currentBatcher;
          this.currentBatcher = this.createBulkBatcher();
          this.dispatchLimiter.push(() => batch.dispatch(this.partitionMetric));
        }
      } finally {
        this.lock.leave();
      }
    });
  }

  private createBulkBatcher(): BulkBatcher {
    return new BulkBatcher(
      this.dispatchLimiter,
      this.executor,
      this.retrier,
      this.diagnosticLevel,
      this.encryptionEnabled,
      this.clientConfigDiagnostics,
      this.encryptionProcessor,
      this.operationsCountRef,
    );
  }

  runCongestionAlgorithm(): void {
    this.congestionControlAlgorithm.run();
  }
}
