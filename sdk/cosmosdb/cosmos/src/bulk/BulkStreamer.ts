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

/**
 * Handles operation queueing and dispatching. Fills batches efficiently and maintains a timer for early dispatching in case of partially-filled batches and to optimize for throughput. 
 * There is always one batch at a time being filled. Locking is in place to avoid concurrent threads trying to Add operations while the timer might be Dispatching the current batch.
 * The current batch is dispatched and a new one is readied to be filled by new operations, the dispatched batch runs independently through a fire and forget pattern.
 * @hidden
 */

export class BulkStreamer {
    private readonly executor: ExecuteCallback;
    private readonly retrier: RetryCallback;
    private readonly options: RequestOptions;
    private readonly bulkOptions: BulkOptions;
    private readonly diagnosticNode: DiagnosticNodeInternal;


    private currentBatcher: BulkBatcher;
    private readonly lock = semaphore(1);
    private dispatchTimer: NodeJS.Timeout;
    private readonly orderedResponse: BulkOperationResult[] = [];


    constructor(
        executor: ExecuteCallback,
        retrier: RetryCallback,
        options: RequestOptions,
        bulkOptions: BulkOptions,
        diagnosticNode: DiagnosticNodeInternal,
        orderedResponse: BulkOperationResult[]
    ) {
        this.executor = executor;
        this.retrier = retrier;
        this.options = options;
        this.bulkOptions = bulkOptions;
        this.diagnosticNode = diagnosticNode;
        this.orderedResponse = orderedResponse;
        this.currentBatcher = this.createBulkBatcher();
        this.runDispatchTimer();
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
            toDispatch.dispatch();
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
        return new BulkBatcher(this.executor, this.retrier, this.options, this.bulkOptions, this.diagnosticNode, this.orderedResponse);
    }

    /**
     * Initializes a timer to periodically dispatch partially-filled batches.
     */
    private runDispatchTimer(): void {
        this.dispatchTimer = setInterval(() => {
            let toDispatch: BulkBatcher;
            this.lock.take(() => {
                toDispatch = this.getBatchToDispatchAndCreate();
                this.lock.leave();
            });
            if (toDispatch) {
                toDispatch.dispatch();
            }
        }, Constants.BulkTimeoutInMs);
    }

    /**
     * Dispose the active timers after bulk is done
     */
    disposeTimers(): void {
        if (this.dispatchTimer) {
            clearInterval(this.dispatchTimer);
        }
    }
}
