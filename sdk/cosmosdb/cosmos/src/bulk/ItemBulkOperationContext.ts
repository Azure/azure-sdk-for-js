// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { RetryPolicy } from "../retry/RetryPolicy.js";
import type { CosmosBulkOperationResult } from "../utils/batch.js";
import { TaskCompletionSource } from "../utils/batch.js";

/**
 * Context for a particular @see {@link ItemBulkOperation}.
 * @hidden
 */
export class ItemBulkOperationContext {
  pkRangeId: string;
  retryPolicy: RetryPolicy;
  diagnosticNode: DiagnosticNodeInternal;
  private readonly taskCompletionSource: TaskCompletionSource<CosmosBulkOperationResult>;

  constructor(pkRangeId: string, retryPolicy: RetryPolicy, diagnosticNode: DiagnosticNodeInternal) {
    this.pkRangeId = pkRangeId;
    this.retryPolicy = retryPolicy;
    this.diagnosticNode = diagnosticNode;
    this.taskCompletionSource = new TaskCompletionSource<CosmosBulkOperationResult>();
  }

  public get operationPromise(): Promise<CosmosBulkOperationResult> {
    return this.taskCompletionSource.task;
  }

  addDiagnosticChild(diagnosticNode: DiagnosticNodeInternal): void {
    this.diagnosticNode.addBulkChildNode(diagnosticNode, this.diagnosticNode.diagnosticLevel);
    diagnosticNode.updateTimestamp();
  }

  updatePKRangeId(pkRangeId: string): void {
    this.pkRangeId = pkRangeId;
  }

  complete(result: CosmosBulkOperationResult): void {
    this.taskCompletionSource.setResult(result);
  }

  fail(error: CosmosBulkOperationResult): void {
    const errorObject = new Error(`Bulk operation failed: ${JSON.stringify(error)}`);
    this.taskCompletionSource.setException(errorObject);
  }
}
