"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batcher = void 0;
const constants_js_1 = require("../common/constants.js");
const statusCodes_js_1 = require("../common/statusCodes.js");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
const index_js_1 = require("../index.js");
const batch_js_1 = require("../utils/batch.js");
const time_js_1 = require("../utils/time.js");
/**
 * Maintains a batch of operations and dispatches it as a unit of work.
 * Execution of the request is done by the @see {@link ExecuteCallback} and retry is done by the @see {@link RetryCallback}.
 * @hidden
 */
class Batcher {
    constructor(limiter, executor, retrier, diagnosticLevel, encryptionEnabled, clientConfig, encryptionProcessor, processedOperationCountRef) {
        this.limiter = limiter;
        this.batchOperationsList = [];
        this.executor = executor;
        this.retrier = retrier;
        this.diagnosticLevel = diagnosticLevel;
        this.encryptionEnabled = encryptionEnabled;
        this.encryptionProcessor = encryptionProcessor;
        this.clientConfigDiagnostics = clientConfig;
        this.currentSize = 0;
        this.toBeDispatched = false;
        this.processedOperationCountRef = processedOperationCountRef;
    }
    /**
     * Attempts to add an operation to the current batch.
     * Returns false if the batch is full or already dispatched.
     */
    tryAdd(operation) {
        if (this.toBeDispatched) {
            return false;
        }
        if (!operation) {
            throw new index_js_1.ErrorResponse("Operation is not defined");
        }
        if (!operation.operationContext) {
            throw new index_js_1.ErrorResponse("Operation context is not defined");
        }
        if (this.batchOperationsList.length === constants_js_1.Constants.MaxBulkOperationsCount) {
            return false;
        }
        const currentOperationSize = (0, batch_js_1.calculateObjectSizeInBytes)(operation.operationInput);
        if (this.batchOperationsList.length > 0 &&
            this.currentSize + currentOperationSize > constants_js_1.Constants.DefaultMaxBulkRequestBodySizeInBytes) {
            return false;
        }
        this.currentSize += currentOperationSize;
        this.batchOperationsList.push(operation);
        return true;
    }
    isEmpty() {
        return this.batchOperationsList.length === 0;
    }
    /**
     * Dispatches the current batch of operations.
     * Handles retries for failed operations and updates the ordered response.
     */
    async dispatch(partitionMetric) {
        var _a, _b;
        this.toBeDispatched = true;
        const startTime = (0, time_js_1.getCurrentTimestampInMs)();
        const diagnosticNode = new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(this.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.BATCH_REQUEST, null);
        try {
            const response = await this.executor(this.batchOperationsList, diagnosticNode);
            const hasThrottles = 1;
            const noThrottle = 0;
            const numThrottle = ((_a = response === null || response === void 0 ? void 0 : response.results) === null || _a === void 0 ? void 0 : _a.some((result) => "code" in result && result.code === statusCodes_js_1.StatusCodes.TooManyRequests))
                ? hasThrottles
                : noThrottle;
            const splitOrMerge = ((_b = response === null || response === void 0 ? void 0 : response.results) === null || _b === void 0 ? void 0 : _b.some((result) => "code" in result && result.code === statusCodes_js_1.StatusCodes.Gone))
                ? true
                : false;
            if (splitOrMerge) {
                await this.limiter.pauseAndClear(statusCodes_js_1.StatusCodes.Gone, diagnosticNode);
            }
            partitionMetric.add(this.batchOperationsList.length, (0, time_js_1.getCurrentTimestampInMs)() - startTime, numThrottle);
            for (let i = 0; i < response.operations.length; i++) {
                const operation = response.operations[i];
                const bulkOperationResult = response.results[i];
                if (bulkOperationResult instanceof index_js_1.ErrorResponse) {
                    const shouldRetry = await operation.operationContext.retryPolicy.shouldRetry(bulkOperationResult, operation.operationContext.diagnosticNode);
                    if (shouldRetry) {
                        await this.retrier(operation, operation.operationContext.diagnosticNode);
                        continue;
                    }
                }
                try {
                    if (this.encryptionEnabled && bulkOperationResult.resourceBody) {
                        operation.operationContext.diagnosticNode.beginEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                        const { body: decryptedBody, propertiesDecryptedCount } = await this.encryptionProcessor.decrypt(bulkOperationResult.resourceBody);
                        bulkOperationResult.resourceBody = decryptedBody;
                        operation.operationContext.diagnosticNode.endEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                    }
                }
                catch (error) {
                    // if decryption fails after successful write operation, fail the operation with internal server error
                    if (operation.operationInput.operationType !== "Read") {
                        const decryptionError = new index_js_1.ErrorResponse(`Item ${operation.operationInput.operationType} operation was successful but response decryption failed: + ${error.message}`);
                        decryptionError.code = statusCodes_js_1.StatusCodes.ServiceUnavailable;
                        throw decryptionError;
                    }
                }
                operation.operationContext.addDiagnosticChild(diagnosticNode);
                bulkOperationResult.diagnostics = operation.operationContext.diagnosticNode.toDiagnostic(this.clientConfigDiagnostics);
                const bulkItemResponse = {
                    operationInput: operation.unencryptedOperationInput,
                };
                if (bulkOperationResult instanceof index_js_1.ErrorResponse) {
                    bulkItemResponse.error = bulkOperationResult;
                }
                else {
                    bulkItemResponse.response = bulkOperationResult;
                }
                operation.operationContext.complete(bulkItemResponse);
                this.processedOperationCountRef.count++;
            }
        }
        catch (error) {
            // Mark all operations in the batch as failed
            for (const operation of this.batchOperationsList) {
                const response = {
                    operationInput: operation.operationInput,
                    error: Object.assign(new index_js_1.ErrorResponse(error.message), {
                        code: statusCodes_js_1.StatusCodes.InternalServerError,
                        diagnostics: operation.operationContext.diagnosticNode.toDiagnostic(this.clientConfigDiagnostics),
                    }),
                };
                operation.operationContext.fail(response);
                this.processedOperationCountRef.count++;
            }
        }
        finally {
            // Clean up batch state
            this.batchOperationsList = [];
        }
    }
    getOperations() {
        return this.batchOperationsList;
    }
}
exports.Batcher = Batcher;
//# sourceMappingURL=Batcher.js.map