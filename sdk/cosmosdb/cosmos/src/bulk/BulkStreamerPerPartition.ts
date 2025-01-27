// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common";
import type { ExecuteCallback, RetryCallback } from "../utils/batch";
import { BulkBatcher } from "./BulkBatcher";
import semaphore from "semaphore";
import type { ItemBulkOperation } from "./ItemBulkOperation";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { BulkOptions } from "../utils/batch";
import type { RequestOptions } from "../request/RequestOptions";
import type { BulkOperationResult } from "./BulkOperationResult";
import { BulkPartitionMetric } from "./BulkPartitionMetric";
import { BulkCongestionAlgorithm } from "./BulkCongestionAlgorithm";

/**
 * Handles operation queueing and dispatching. Fills batches efficiently and maintains a timer for early dispatching in case of partially-filled batches and to optimize for throughput.
 * There is always one batch at a time being filled. Locking is in place to avoid concurrent threads trying to Add operations while the timer might be Dispatching the current batch.
 * The current batch is dispatched and a new one is readied to be filled by new operations, the dispatched batch runs independently through a fire and forget pattern.
 * @hidden
 */

export class BulkStreamerPerPartition {
  private readonly executor: ExecuteCallback;
  private readonly retrier: RetryCallback;
  private readonly options: RequestOptions;
  private readonly bulkOptions: BulkOptions;
  private readonly diagnosticNode: DiagnosticNodeInternal;

  private currentBatcher: BulkBatcher;
  private readonly lock: semaphore.Semaphore;
  private dispatchTimer: NodeJS.Timeout;
  private readonly orderedResponse: BulkOperationResult[] = [];
  private limiterSemaphore: semaphore.Semaphore;

  private readonly oldPartitionMetric: BulkPartitionMetric;
  private readonly partitionMetric: BulkPartitionMetric;
  private congestionControlTimer: NodeJS.Timeout;
  private congestionControlDelayInMs: number = 100;
  private congestionDegreeOfConcurrency = 1;
  private congestionControlAlgorithm: BulkCongestionAlgorithm;
  // private semaphoreForSplit: semaphore.Semaphore;

  constructor(
    executor: ExecuteCallback,
    retrier: RetryCallback,
    limiter: semaphore.Semaphore,
    options: RequestOptions,
    bulkOptions: BulkOptions,
    diagnosticNode: DiagnosticNodeInternal,
    orderedResponse: BulkOperationResult[],
  ) {
    this.executor = executor;
    this.retrier = retrier;
    this.limiterSemaphore = limiter;
    this.options = options;
    this.bulkOptions = bulkOptions;
    this.diagnosticNode = diagnosticNode;
    this.orderedResponse = orderedResponse;
    this.currentBatcher = this.createBulkBatcher();
    this.oldPartitionMetric = new BulkPartitionMetric();
    this.partitionMetric = new BulkPartitionMetric();
    this.congestionControlAlgorithm = new BulkCongestionAlgorithm(
      this.limiterSemaphore,
      this.partitionMetric,
      this.oldPartitionMetric,
      this.congestionDegreeOfConcurrency,
    );

    this.lock = semaphore(1);
    this.runDispatchTimer();
    this.runCongestionControlTimer();
  }

  /**
   * adds a bulk operation to current batcher and dispatches if batch is full
   * @param operation - operation to add
   */
  add(operation: ItemBulkOperation): void {
    let toDispatch: BulkBatcher | null = null;
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
    // in case batch is being dispatched through timer, current batch operations list could be empty.
    // TODO: don't create new batcher if we don't have any operations.
    if (this.currentBatcher.isEmpty()) return null;
    const previousBatcher = this.currentBatcher;
    this.currentBatcher = this.createBulkBatcher();
    return previousBatcher;
  }

  private createBulkBatcher(): BulkBatcher {
    return new BulkBatcher(
      this.executor,
      this.retrier,
      this.options,
      this.bulkOptions,
      this.diagnosticNode,
      this.orderedResponse,
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
