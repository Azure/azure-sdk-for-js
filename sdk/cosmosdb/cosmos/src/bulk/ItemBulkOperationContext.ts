// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { RetryPolicy } from "../retry/RetryPolicy";
import type { BulkOperationResult } from "../utils/batch";
import { TaskCompletionSource } from "../utils/batch";

/**
 * Context for a particular @see {@link ItemBulkOperation}.
 * @hidden
 */
export class ItemBulkOperationContext {
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

  fail(error: Error): void {
    this.taskCompletionSource.setException(error);
  }
}
