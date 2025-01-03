// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RetryPolicy } from "../retry/RetryPolicy";
import { isSuccessStatusCode, OperationResponse, TaskCompletionSource } from "../utils/batch";

export class ItemBulkOperationContext {
    pkRangeId: string;
    retryPolicy: RetryPolicy;
    private readonly taskCompletionSource: TaskCompletionSource<OperationResponse>;

    constructor(pkRangeId: string, retryPolicy: RetryPolicy) {
        this.pkRangeId = pkRangeId;
        this.retryPolicy = retryPolicy;
        this.taskCompletionSource = new TaskCompletionSource<OperationResponse>();
    }

    public get operationPromise(): Promise<OperationResponse> {
        return this.taskCompletionSource.task;
    }

    // will implement this with next PR. skipping it for now
    async shouldRetry(operationResponse: OperationResponse): Promise<boolean> {
        if (this.retryPolicy == null || isSuccessStatusCode(operationResponse.statusCode)) {
            return false;
        }
        return false;
        // return this.retryPolicy.shouldRetry(operationResponse, diagnosticNode);
    }

    reRouteOperation(pkRangeId: string): void {
        this.pkRangeId = pkRangeId;
    }

    complete(result: OperationResponse): void {
        this.taskCompletionSource.setResult(result);
    }

    fail(error: Error): void {
        this.taskCompletionSource.setException(error);
    }
}
