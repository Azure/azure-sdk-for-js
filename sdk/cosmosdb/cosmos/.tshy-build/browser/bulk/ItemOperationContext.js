// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TaskCompletionSource } from "../utils/batch.js";
/**
 * Context for a particular @see {@link ItemOperation}.
 * @hidden
 */
export class ItemOperationContext {
    constructor(pkRangeId, retryPolicy, diagnosticNode) {
        this.pkRangeId = pkRangeId;
        this.retryPolicy = retryPolicy;
        this.diagnosticNode = diagnosticNode;
        this.taskCompletionSource = new TaskCompletionSource();
    }
    get operationPromise() {
        return this.taskCompletionSource.task;
    }
    addDiagnosticChild(diagnosticNode) {
        this.diagnosticNode.addBulkChildNode(diagnosticNode, this.diagnosticNode.diagnosticLevel);
        diagnosticNode.updateTimestamp();
    }
    updatePKRangeId(pkRangeId) {
        this.pkRangeId = pkRangeId;
    }
    complete(result) {
        this.taskCompletionSource.setResult(result);
    }
    fail(error) {
        this.taskCompletionSource.setException(error.error);
    }
}
//# sourceMappingURL=ItemOperationContext.js.map