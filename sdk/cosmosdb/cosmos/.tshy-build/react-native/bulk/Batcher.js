// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
import { StatusCodes } from "../common/statusCodes.js";
import { DiagnosticNodeInternal, DiagnosticNodeType, } from "../diagnostics/DiagnosticNodeInternal.js";
import { ErrorResponse } from "../index.js";
import { calculateObjectSizeInBytes } from "../utils/batch.js";
import { getCurrentTimestampInMs } from "../utils/time.js";
/**
 * Maintains a batch of operations and dispatches it as a unit of work.
 * Execution of the request is done by the @see {@link ExecuteCallback} and retry is done by the @see {@link RetryCallback}.
 * @hidden
 */
export class Batcher {
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
            throw new ErrorResponse("Operation is not defined");
        }
        if (!operation.operationContext) {
            throw new ErrorResponse("Operation context is not defined");
        }
        if (this.batchOperationsList.length === Constants.MaxBulkOperationsCount) {
            return false;
        }
        const currentOperationSize = calculateObjectSizeInBytes(operation.operationInput);
        if (this.batchOperationsList.length > 0 &&
            this.currentSize + currentOperationSize > Constants.DefaultMaxBulkRequestBodySizeInBytes) {
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
        const startTime = getCurrentTimestampInMs();
        const diagnosticNode = new DiagnosticNodeInternal(this.diagnosticLevel, DiagnosticNodeType.BATCH_REQUEST, null);
        try {
            const response = await this.executor(this.batchOperationsList, diagnosticNode);
            const hasThrottles = 1;
            const noThrottle = 0;
            const numThrottle = ((_a = response === null || response === void 0 ? void 0 : response.results) === null || _a === void 0 ? void 0 : _a.some((result) => "code" in result && result.code === StatusCodes.TooManyRequests))
                ? hasThrottles
                : noThrottle;
            const splitOrMerge = ((_b = response === null || response === void 0 ? void 0 : response.results) === null || _b === void 0 ? void 0 : _b.some((result) => "code" in result && result.code === StatusCodes.Gone))
                ? true
                : false;
            if (splitOrMerge) {
                await this.limiter.pauseAndClear(StatusCodes.Gone, diagnosticNode);
            }
            partitionMetric.add(this.batchOperationsList.length, getCurrentTimestampInMs() - startTime, numThrottle);
            for (let i = 0; i < response.operations.length; i++) {
                const operation = response.operations[i];
                const bulkOperationResult = response.results[i];
                if (bulkOperationResult instanceof ErrorResponse) {
                    const shouldRetry = await operation.operationContext.retryPolicy.shouldRetry(bulkOperationResult, operation.operationContext.diagnosticNode);
                    if (shouldRetry) {
                        await this.retrier(operation, operation.operationContext.diagnosticNode);
                        continue;
                    }
                }
                try {
                    if (this.encryptionEnabled && bulkOperationResult.resourceBody) {
                        operation.operationContext.diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
                        const { body: decryptedBody, propertiesDecryptedCount } = await this.encryptionProcessor.decrypt(bulkOperationResult.resourceBody);
                        bulkOperationResult.resourceBody = decryptedBody;
                        operation.operationContext.diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation, propertiesDecryptedCount);
                    }
                }
                catch (error) {
                    // if decryption fails after successful write operation, fail the operation with internal server error
                    if (operation.operationInput.operationType !== "Read") {
                        const decryptionError = new ErrorResponse(`Item ${operation.operationInput.operationType} operation was successful but response decryption failed: + ${error.message}`);
                        decryptionError.code = StatusCodes.ServiceUnavailable;
                        throw decryptionError;
                    }
                }
                operation.operationContext.addDiagnosticChild(diagnosticNode);
                bulkOperationResult.diagnostics = operation.operationContext.diagnosticNode.toDiagnostic(this.clientConfigDiagnostics);
                const bulkItemResponse = {
                    operationInput: operation.unencryptedOperationInput,
                };
                if (bulkOperationResult instanceof ErrorResponse) {
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
                    error: Object.assign(new ErrorResponse(error.message), {
                        code: StatusCodes.InternalServerError,
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
//# sourceMappingURL=Batcher.js.map