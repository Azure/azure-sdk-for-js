// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { RetryPolicy } from "../retry/RetryPolicy.js";
import type { BulkOperationResult } from "../utils/batch.js";
import { TaskCompletionSource } from "../utils/batch.js";

/**
 * Context for a particular @see {@link ItemOperation}.
 * @hidden
 */
export class ItemOperationContext {
  pkRangeId: string;
  retryPolicy: RetryPolicy;
  diagnosticNode: DiagnosticNodeInternal;
  private readonly taskCompletionSource: TaskCompletionSource<BulkOperationResult>;

  constructor(pkRangeId: string, retryPolicy: RetryPolicy, diagnosticNode: DiagnosticNodeInternal) {
    this.pkRangeId = pkRangeId;
    this.retryPolicy = retryPolicy;
    this.diagnosticNode = diagnosticNode;
    this.taskCompletionSource = new TaskCompletionSource<BulkOperationResult>();
  }

  public get operationPromise(): Promise<BulkOperationResult> {
    return this.taskCompletionSource.task;
  }

  addDiagnosticChild(diagnosticNode: DiagnosticNodeInternal): void {
    this.diagnosticNode.addBulkChildNode(diagnosticNode, this.diagnosticNode.diagnosticLevel);
    diagnosticNode.updateTimestamp();
  }

  updatePKRangeId(pkRangeId: string): void {
    this.pkRangeId = pkRangeId;
  }

  complete(result: BulkOperationResult): void {
    this.taskCompletionSource.setResult(result);
  }

  fail(error: BulkOperationResult): void {
    this.taskCompletionSource.setException(error.error);
  }
}
