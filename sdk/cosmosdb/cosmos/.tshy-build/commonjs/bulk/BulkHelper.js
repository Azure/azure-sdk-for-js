"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkHelper = void 0;
const tslib_1 = require("tslib");
const ClientUtils_js_1 = require("../client/ClientUtils.js");
const constants_js_1 = require("../common/constants.js");
const helper_js_1 = require("../common/helper.js");
const statusCodes_js_1 = require("../common/statusCodes.js");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
const PartitionKeyInternal_js_1 = require("../documents/PartitionKeyInternal.js");
const index_js_1 = require("../index.js");
const bulkExecutionRetryPolicy_js_1 = require("../retry/bulkExecutionRetryPolicy.js");
const resourceThrottleRetryPolicy_js_1 = require("../retry/resourceThrottleRetryPolicy.js");
const batch_js_1 = require("../utils/batch.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
const hash_js_1 = require("../utils/hashing/hash.js");
const HelperPerPartition_js_1 = require("./HelperPerPartition.js");
const index_js_2 = require("./index.js");
/**
 * BulkHelper for bulk operations in a container.
 * It maintains one @see {@link HelperPerPartition} for each Partition Key Range, which allows independent execution of requests. Queue based limiters @see {@link LimiterQueue}
 * rate limit requestsbat the helper / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the helper dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */
class BulkHelper {
    /**
     * @internal
     */
    constructor(container, clientContext, partitionKeyRangeCache, options) {
        this.processedOperationCountRef = { count: 0 };
        this.operationPromisesList = [];
        this.congestionControlDelayInMs = 1000;
        this.operationsPerSleep = 100; // Number of operations to add per sleep
        this.intervalForPartialBatchInMs = 1000; // Sleep interval before adding partial batch to dispatch queue
        this.container = container;
        this.clientContext = clientContext;
        this.partitionKeyRangeCache = partitionKeyRangeCache;
        this.helpersByPartitionKeyRangeId = new Map();
        this.options = options;
        this.executeRequest = this.executeRequest.bind(this);
        this.reBatchOperation = this.reBatchOperation.bind(this);
        this.refreshPartitionKeyRangeCache = this.refreshPartitionKeyRangeCache.bind(this);
        this.isCancelled = false;
        this.runCongestionControlTimer();
    }
    /**
     * adds operation(s) to the helper
     * @param operationInput - bulk operation or list of bulk operations
     */
    async execute(operationInput) {
        const addOperationPromises = [];
        const minimalPause = 0; // minimal pause (0 ms) inserted periodically during processing.
        try {
            for (let i = 0; i < operationInput.length; i++) {
                // After every 100 operations,sleep of 0 ms is added to allow the event loop to process any pending
                // callbacks/tasks such as fetching partition key definition and dispatching batches from queue. This helps
                // to prevent blocking and improves overall responsiveness.
                if (i % this.operationsPerSleep === 0) {
                    await (0, helper_js_1.sleep)(minimalPause);
                }
                addOperationPromises.push(this.addOperation(operationInput[i], i));
            }
            await Promise.allSettled(addOperationPromises);
            // After processing all operations via addOperation, it's possible that the current batch in each helper is not completely full.
            // In such cases, addPartialBatchToQueue is called to ensure that all the operations are added to the dispatch queue.
            // while loop below waits until the count of processed operations equals the number of input operations. This is necessary because
            // some operations might fail and then again get added to current batch for retry.
            while (this.processedOperationCountRef.count < operationInput.length) {
                this.helpersByPartitionKeyRangeId.forEach((helper) => {
                    helper.addPartialBatchToQueue();
                });
                // Pause for 1000 ms to give pending operations chance to accumulate into a batch to avoid sending multiple small batches.
                await (0, helper_js_1.sleep)(this.intervalForPartialBatchInMs);
            }
        }
        finally {
            if (this.congestionControlTimer) {
                clearInterval(this.congestionControlTimer);
            }
        }
        const settledResults = await Promise.allSettled(this.operationPromisesList);
        if (this.isCancelled && this.staleRidError) {
            throw this.staleRidError;
        }
        const bulkOperationResults = settledResults.map((result) => result.status === "fulfilled" ? result.value : result.reason);
        // Formatting result: if an error is present, removing the stack trace details.
        const formattedResults = bulkOperationResults.map((result) => {
            if (result && result.error) {
                const _a = result.error, { stack } = _a, otherProps = tslib_1.__rest(_a, ["stack"]);
                const trimmedError = Object.assign({ message: result.error.message }, otherProps);
                return Object.assign(Object.assign({}, result), { error: trimmedError });
            }
            return result;
        });
        return formattedResults;
    }
    async addOperation(operation, idx) {
        if (this.isCancelled) {
            return;
        }
        if (!operation) {
            this.operationPromisesList[idx] = Promise.resolve({
                operationInput: operation,
                error: Object.assign(new index_js_1.ErrorResponse("Operation cannot be null or undefined."), {
                    code: statusCodes_js_1.StatusCodes.InternalServerError,
                }),
            });
            return;
        }
        // Checks for id and partition key in input body
        if (operation.operationType === "Create" ||
            operation.operationType === "Upsert" ||
            operation.operationType === "Replace") {
            if (!operation.resourceBody.id) {
                this.operationPromisesList[idx] = Promise.resolve({
                    operationInput: operation,
                    error: Object.assign(new index_js_1.ErrorResponse(`Operation resource body must have an 'id' for ${operation.operationType} operations.`), { code: statusCodes_js_1.StatusCodes.InternalServerError }),
                });
                this.processedOperationCountRef.count++;
                return;
            }
        }
        if (operation.partitionKey === undefined) {
            this.operationPromisesList[idx] = Promise.resolve({
                operationInput: operation,
                error: Object.assign(new index_js_1.ErrorResponse(`PartitionKey is required for ${operation.operationType} operations.`), { code: statusCodes_js_1.StatusCodes.InternalServerError }),
            });
            this.processedOperationCountRef.count++;
            return;
        }
        let operationError;
        let diagnosticNode;
        let unencryptedOperation;
        let partitionKeyRangeId;
        try {
            diagnosticNode = new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(this.clientContext.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
            // Ensure partition key definition is available.
            if (!this.partitionKeyDefinition) {
                if (!this.partitionKeyDefinitionPromise) {
                    this.partitionKeyDefinitionPromise = (async () => {
                        try {
                            const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, this.container);
                            this.partitionKeyDefinition = partitionKeyDefinition;
                            return partitionKeyDefinition;
                        }
                        finally {
                            this.partitionKeyDefinitionPromise = null;
                        }
                    })();
                }
                await this.partitionKeyDefinitionPromise;
            }
            unencryptedOperation = (0, helper_js_1.copyObject)(operation);
            // If encryption is enabled, encrypt the operation input.
            if (this.clientContext.enableEncryption) {
                operation = (0, helper_js_1.copyObject)(operation);
                await this.container.checkAndInitializeEncryption();
                diagnosticNode.beginEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
                const { operation: encryptedOp, totalPropertiesEncryptedCount } = await (0, batch_js_1.encryptOperationInput)(this.container.encryptionProcessor, operation, 0);
                operation = encryptedOp;
                diagnosticNode.endEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsEncryptOperation, totalPropertiesEncryptedCount);
            }
            // Resolve the partition key range id.
            partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode);
        }
        catch (error) {
            operationError = error;
        }
        // Get helper & context.
        const helperForPartition = this.getHelperForPKRange(partitionKeyRangeId);
        const retryPolicy = this.getRetryPolicy();
        const context = new index_js_2.ItemOperationContext(partitionKeyRangeId, retryPolicy, diagnosticNode);
        const itemOperation = {
            unencryptedOperationInput: unencryptedOperation,
            operationInput: operation,
            operationContext: context,
        };
        // Assign the promise (ensuring position matches input order)
        this.operationPromisesList[idx] = context.operationPromise;
        if (operationError) {
            const response = {
                operationInput: unencryptedOperation,
                error: Object.assign(new index_js_1.ErrorResponse(operationError.message), {
                    code: statusCodes_js_1.StatusCodes.InternalServerError,
                    diagnostics: diagnosticNode === null || diagnosticNode === void 0 ? void 0 : diagnosticNode.toDiagnostic(this.clientContext.getClientConfig()),
                }),
            };
            context.fail(response);
            this.processedOperationCountRef.count++;
            return;
        }
        // Add the operation to the helper.
        return helperForPartition.add(itemOperation);
    }
    async resolvePartitionKeyRangeId(operation, diagnosticNode) {
        const partitionKeyRanges = (await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)).getOrderedParitionKeyRanges();
        const partitionKey = (0, PartitionKeyInternal_js_1.convertToInternalPartitionKey)(operation.partitionKey);
        const hashedKey = (0, hash_js_1.hashPartitionKey)(partitionKey, this.partitionKeyDefinition);
        const matchingRange = partitionKeyRanges.find((range) => (0, batch_js_1.isKeyInRange)(range.minInclusive, range.maxExclusive, hashedKey));
        if (!matchingRange) {
            throw new Error("No matching partition key range found for the operation.");
        }
        return matchingRange.id;
    }
    getRetryPolicy() {
        const nextRetryPolicy = new resourceThrottleRetryPolicy_js_1.ResourceThrottleRetryPolicy(this.clientContext.getRetryOptions());
        return new bulkExecutionRetryPolicy_js_1.BulkExecutionRetryPolicy(nextRetryPolicy);
    }
    async executeRequest(operations, diagnosticNode) {
        if (this.isCancelled) {
            throw new index_js_1.ErrorResponse("Bulk execution cancelled due to a previous error.");
        }
        if (!operations.length)
            return;
        const pkRangeId = operations[0].operationContext.pkRangeId;
        const path = (0, helper_js_1.getPathFromLink)(this.container.url, constants_js_1.ResourceType.item);
        const requestBody = [];
        for (const itemOperation of operations) {
            requestBody.push(this.prepareOperation(itemOperation.operationInput));
        }
        if (!this.options.containerRid) {
            this.options.containerRid = this.container._rid;
        }
        try {
            const response = await (0, diagnostics_js_1.addDiagnosticChild)(async (childNode) => this.clientContext.bulk({
                body: requestBody,
                partitionKeyRangeId: pkRangeId,
                path: path,
                resourceId: this.container.url,
                options: this.options,
                diagnosticNode: childNode,
            }), diagnosticNode, DiagnosticNodeInternal_js_1.DiagnosticNodeType.BATCH_REQUEST);
            if (!response) {
                throw new index_js_1.ErrorResponse("Failed to fetch bulk response.");
            }
            return index_js_2.BulkResponse.fromResponseMessage(response, operations);
        }
        catch (error) {
            if (this.clientContext.enableEncryption) {
                try {
                    await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
                }
                catch (err) {
                    await this.cancelExecution(err);
                    return index_js_2.BulkResponse.createEmptyResponse(operations, 0, 0, {});
                }
            }
            return index_js_2.BulkResponse.fromResponseMessage(error, operations);
        }
    }
    prepareOperation(operationInput) {
        operationInput.partitionKey = (0, PartitionKeyInternal_js_1.convertToInternalPartitionKey)(operationInput.partitionKey);
        return Object.assign(Object.assign({}, operationInput), { partitionKey: JSON.stringify(operationInput.partitionKey) });
    }
    async reBatchOperation(operation, diagnosticNode) {
        const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation.operationInput, diagnosticNode);
        operation.operationContext.updatePKRangeId(partitionKeyRangeId);
        const helper = this.getHelperForPKRange(partitionKeyRangeId);
        await helper.add(operation);
    }
    async cancelExecution(error) {
        this.isCancelled = true;
        this.staleRidError = error;
        for (const helper of this.helpersByPartitionKeyRangeId.values()) {
            await helper.dispose();
        }
        this.helpersByPartitionKeyRangeId.clear();
    }
    getHelperForPKRange(pkRangeId) {
        if (this.helpersByPartitionKeyRangeId.has(pkRangeId)) {
            return this.helpersByPartitionKeyRangeId.get(pkRangeId);
        }
        const newHelper = new HelperPerPartition_js_1.HelperPerPartition(this.executeRequest, this.reBatchOperation, this.refreshPartitionKeyRangeCache, this.clientContext.diagnosticLevel, this.clientContext.enableEncryption, this.clientContext.getClientConfig(), this.container.encryptionProcessor, this.processedOperationCountRef);
        this.helpersByPartitionKeyRangeId.set(pkRangeId, newHelper);
        return newHelper;
    }
    runCongestionControlTimer() {
        this.congestionControlTimer = setInterval(() => {
            this.helpersByPartitionKeyRangeId.forEach((helper) => {
                helper.runCongestionAlgorithm();
            });
        }, this.congestionControlDelayInMs);
    }
    async refreshPartitionKeyRangeCache(diagnosticNode) {
        await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode, true);
    }
}
exports.BulkHelper = BulkHelper;
//# sourceMappingURL=BulkHelper.js.map