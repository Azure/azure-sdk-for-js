// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common";
import { ExecuteCallback, RetryCallback } from "../utils/batch";
import { BulkBatcher } from "./BulkBatcher";
import semaphore from "semaphore";
import { ItemBulkOperation } from "./ItemBulkOperation";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { BulkOptions, OperationResponse } from "../utils/batch";
import { RequestOptions } from "../request/RequestOptions";

export class BulkStreamer {
    private readonly executor: ExecuteCallback;
    private readonly retrier: RetryCallback;
    private readonly options: RequestOptions;
    private readonly bulkOptions: BulkOptions;
    private readonly diagnosticNode: DiagnosticNodeInternal;


    private currentBatcher: BulkBatcher;
    private lock = semaphore(1);
    private dispatchTimer: NodeJS.Timeout;
    private orderedResponse: OperationResponse[] = [];


    constructor(
        executor: ExecuteCallback,
        retrier: RetryCallback,
        options: RequestOptions,
        bulkOptions: BulkOptions,
        diagnosticNode: DiagnosticNodeInternal,
        orderedResponse: OperationResponse[]
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

    async add(operation: ItemBulkOperation): Promise<void> {
        let toDispatch: BulkBatcher;
        this.lock.take(() => {
            try {
                while (!this.currentBatcher.tryAdd(operation)) {
                    toDispatch = this.getBatchToDispatchAndCreate();
                }
            } finally {
                this.lock.leave();
            }
        });
        if (toDispatch) {
            toDispatch.dispatch();
        }
    }

    private getBatchToDispatchAndCreate(): BulkBatcher {
        if (!this.currentBatcher) return null;
        const previousBatcher = this.currentBatcher;
        this.currentBatcher = this.createBulkBatcher();
        return previousBatcher;
    }

    private createBulkBatcher(): BulkBatcher {
        return new BulkBatcher(this.executor, this.retrier, this.options, this.bulkOptions, this.diagnosticNode, this.orderedResponse);
    }

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

    disposeTimers(): void {
        if (this.dispatchTimer) {
            clearInterval(this.dispatchTimer);
        }
    }
}
