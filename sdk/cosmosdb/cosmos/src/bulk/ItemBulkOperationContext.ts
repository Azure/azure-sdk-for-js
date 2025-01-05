// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RetryPolicy } from "../retry/RetryPolicy";
import { TaskCompletionSource } from "../utils/batch";
import type { BulkOperationResult } from "./BulkOperationResult";

/**
 * Context for a particular @see {@link ItemBulkOperation}.
 * @hidden
 */
export class ItemBulkOperationContext {
  pkRangeId: string;
  retryPolicy: RetryPolicy;
  private readonly taskCompletionSource: TaskCompletionSource<BulkOperationResult>;

  constructor(pkRangeId: string, retryPolicy: RetryPolicy) {
    this.pkRangeId = pkRangeId;
    this.retryPolicy = retryPolicy;
    this.taskCompletionSource = new TaskCompletionSource<BulkOperationResult>();
  }

  public get operationPromise(): Promise<BulkOperationResult> {
    return this.taskCompletionSource.task;
  }

  reRouteOperation(pkRangeId: string): void {
    this.pkRangeId = pkRangeId;
  }

  complete(result: BulkOperationResult): void {
    this.taskCompletionSource.setResult(result);
  }

  fail(error: Error): void {
    this.taskCompletionSource.setException(error);
  }
}
