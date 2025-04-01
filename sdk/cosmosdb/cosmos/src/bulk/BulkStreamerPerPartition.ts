// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common";
import type { ExecuteCallback, RetryCallback } from "../utils/batch";
import { BulkBatcher } from "./BulkBatcher";
import semaphore from "semaphore";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import { BulkPartitionMetric } from "./BulkPartitionMetric";
import { BulkCongestionAlgorithm } from "./BulkCongestionAlgorithm";
import type { Limiter } from "./Limiter";
import type { EncryptionProcessor } from "../encryption";
import type { ClientConfigDiagnostic } from "../CosmosDiagnostics";
import type { CosmosDbDiagnosticLevel } from "../diagnostics/CosmosDbDiagnosticLevel";

/**
 * Handles operation queueing and dispatching. Fills batches efficiently and maintains a timer for early dispatching in case of partially-filled batches and to optimize for throughput.
 * There is always one batch at a time being filled. Locking is in place to avoid concurrent threads trying to Add operations while the timer might be Dispatching the current batch.
 * The current batch is dispatched and a new one is readied to be filled by new operations, the dispatched batch runs independently through a fire and forget pattern.
 * @hidden
 */

export class BulkStreamerPerPartition {
  private readonly executor: ExecuteCallback;
  private readonly retrier: RetryCallback;
  private currentBatcher: BulkBatcher;
  private readonly lock: semaphore.Semaphore;
  private dispatchTimer: NodeJS.Timeout;
  private limiterSemaphore: Limiter;
  private readonly oldPartitionMetric: BulkPartitionMetric;
  private readonly partitionMetric: BulkPartitionMetric;
  private readonly congestionControlAlgorithm: BulkCongestionAlgorithm;
  private congestionControlTimer: NodeJS.Timeout;
  private readonly congestionControlDelayInMs: number = 100;
  private readonly diagnosticLevel: CosmosDbDiagnosticLevel;
  private readonly encryptionEnabled: boolean;
  private readonly encryptionProcessor: EncryptionProcessor;
  private readonly clientConfigDiagnostics: ClientConfigDiagnostic;

  constructor(
    executor: ExecuteCallback,
    retrier: RetryCallback,
    limiter: Limiter,
    diagnosticLevel: CosmosDbDiagnosticLevel,
    encryptionEnabled: boolean,
    clientConfig: ClientConfigDiagnostic,
    encryptionProcessor: EncryptionProcessor,
  ) {
    this.executor = executor;
    this.retrier = retrier;
    this.limiterSemaphore = limiter;
    this.diagnosticLevel = diagnosticLevel;
    this.encryptionEnabled = encryptionEnabled;
    this.encryptionProcessor = encryptionProcessor;
    this.clientConfigDiagnostics = clientConfig;
    this.oldPartitionMetric = new BulkPartitionMetric();
    this.partitionMetric = new BulkPartitionMetric();
    this.congestionControlAlgorithm = new BulkCongestionAlgorithm(
      this.limiterSemaphore,
      this.partitionMetric,
      this.oldPartitionMetric,
    );
    this.currentBatcher = this.createBulkBatcher();

    this.lock = semaphore(1);
    this.runDispatchTimer();
    this.runCongestionControlTimer();
  }

  /**
   * adds a bulk operation to current batcher and dispatches if batch is full
   * @param operation - operation to add
   */
  add(operation: ItemBulkOperation): void {
    let toDispatch: BulkBatcher;
    this.lock.take(() => {
      try {
        // attempt to add operation until it fits in the current batch for the streamer
        while (!this.currentBatcher.tryAdd(operation)) {
          toDispatch = this.getBatchToDispatchAndCreate();
        }
      } finally {
        this.lock.leave();
      }
    });

    if (toDispatch) {
      // dispatch with fire and forget. No need to wait for the dispatch to complete.
      toDispatch.dispatch(this.partitionMetric);
    }
  }

  /**
   * @returns the batch to be dispatched and creates a new one
   */
  private getBatchToDispatchAndCreate(): BulkBatcher {
    if (this.currentBatcher.isEmpty()) return null;
    const previousBatcher = this.currentBatcher;
    this.currentBatcher = this.createBulkBatcher();
    return previousBatcher;
  }

  private createBulkBatcher(): BulkBatcher {
    return new BulkBatcher(
      this.limiterSemaphore,
      this.executor,
      this.retrier,
      this.diagnosticLevel,
      this.encryptionEnabled,
      this.clientConfigDiagnostics,
      this.encryptionProcessor,
    );
  }

  /**
   * Initializes a timer to periodically dispatch partially-filled batches.
   */
  private runDispatchTimer(): void {
    this.dispatchTimer = setInterval(() => {
      let toDispatch: BulkBatcher;
      try {
        this.lock.take(() => {
          toDispatch = this.getBatchToDispatchAndCreate();
        });
      } finally {
        this.lock.leave();
      }
      if (toDispatch) {
        toDispatch.dispatch(this.partitionMetric);
      }
    }, Constants.BulkTimeoutInMs);
  }

  private runCongestionControlTimer(): void {
    this.congestionControlTimer = setInterval(() => {
      this.congestionControlAlgorithm.run();
    }, this.congestionControlDelayInMs);
  }

  /**
   * Dispose the active timers after bulk is complete.
   */
  disposeTimers(): void {
    if (this.dispatchTimer) {
      clearInterval(this.dispatchTimer);
    }
    if (this.congestionControlTimer) {
      clearInterval(this.congestionControlTimer);
    }
  }
}
