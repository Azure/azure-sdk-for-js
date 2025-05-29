"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemOperationContext = void 0;
const batch_js_1 = require("../utils/batch.js");
/**
 * Context for a particular @see {@link ItemOperation}.
 * @hidden
 */
class ItemOperationContext {
    constructor(pkRangeId, retryPolicy, diagnosticNode) {
        this.pkRangeId = pkRangeId;
        this.retryPolicy = retryPolicy;
        this.diagnosticNode = diagnosticNode;
        this.taskCompletionSource = new batch_js_1.TaskCompletionSource();
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
exports.ItemOperationContext = ItemOperationContext;
//# sourceMappingURL=ItemOperationContext.js.map