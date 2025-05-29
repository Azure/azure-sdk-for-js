"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCompletionSource = exports.BulkOperationType = void 0;
exports.isKeyInRange = isKeyInRange;
exports.hasResource = hasResource;
exports.prepareOperations = prepareOperations;
exports.splitBatchBasedOnBodySize = splitBatchBasedOnBodySize;
exports.calculateObjectSizeInBytes = calculateObjectSizeInBytes;
exports.decorateBatchOperation = decorateBatchOperation;
exports.isSuccessStatusCode = isSuccessStatusCode;
exports.encryptOperationInput = encryptOperationInput;
const extractPartitionKey_js_1 = require("../extractPartitionKey.js");
const index_js_1 = require("../documents/index.js");
const typeChecks_js_1 = require("./typeChecks.js");
const request_js_1 = require("../request/request.js");
const constants_js_1 = require("../common/constants.js");
const core_util_1 = require("@azure/core-util");
function isKeyInRange(min, max, key) {
    const isAfterMinInclusive = key.localeCompare(min) >= 0;
    const isBeforeMax = key.localeCompare(max) < 0;
    return isAfterMinInclusive && isBeforeMax;
}
exports.BulkOperationType = {
    Create: "Create",
    Upsert: "Upsert",
    Read: "Read",
    Delete: "Delete",
    Replace: "Replace",
    Patch: "Patch",
};
function hasResource(operation) {
    return (operation.operationType !== "Patch" &&
        operation.resourceBody !== undefined);
}
/**
 * Maps OperationInput to Operation by
 * - generating Ids if needed.
 * - choosing partitionKey which can be used to choose which batch this
 * operation should be part of. The order is -
 *   1. If the operationInput itself has partitionKey field set it is used.
 *   2. Other wise for create/replace/upsert it is extracted from resource body.
 *   3. For read/delete/patch type operations undefined partitionKey is used.
 * - Here one nuance is that, the partitionKey field inside Operation needs to
 *  be serialized as a JSON string.
 * @param operationInput - OperationInput
 * @param definition - PartitionKeyDefinition
 * @param options - RequestOptions
 * @returns
 */
function prepareOperations(operationInput, definition, options = {}) {
    populateIdsIfNeeded(operationInput, options);
    let partitionKey;
    if (Object.prototype.hasOwnProperty.call(operationInput, "partitionKey")) {
        if (operationInput.partitionKey === undefined) {
            partitionKey = definition.paths.map(() => index_js_1.NonePartitionKeyLiteral);
        }
        else {
            partitionKey = (0, index_js_1.convertToInternalPartitionKey)(operationInput.partitionKey);
        }
    }
    else {
        switch (operationInput.operationType) {
            case exports.BulkOperationType.Create:
            case exports.BulkOperationType.Replace:
            case exports.BulkOperationType.Upsert:
                partitionKey = (0, typeChecks_js_1.assertNotUndefined)((0, extractPartitionKey_js_1.extractPartitionKeys)(operationInput.resourceBody, definition), "Unexpected undefined Partition Key Found.");
                break;
            case exports.BulkOperationType.Read:
            case exports.BulkOperationType.Delete:
            case exports.BulkOperationType.Patch:
                partitionKey = (0, extractPartitionKey_js_1.undefinedPartitionKey)(definition);
                break;
        }
    }
    return {
        operation: Object.assign(Object.assign({}, operationInput), { partitionKey: JSON.stringify(partitionKey) }),
        partitionKey,
    };
}
/**
 * For operations requiring Id genrate random uuids.
 * @param operationInput - OperationInput to be checked.
 * @param options - RequestOptions
 */
function populateIdsIfNeeded(operationInput, options) {
    if (operationInput.operationType === exports.BulkOperationType.Create ||
        operationInput.operationType === exports.BulkOperationType.Upsert) {
        if ((operationInput.resourceBody.id === undefined || operationInput.resourceBody.id === "") &&
            !options.disableAutomaticIdGeneration) {
            operationInput.resourceBody.id = (0, core_util_1.randomUUID)();
        }
    }
}
/**
 * Splits a batch into array of batches based on cumulative size of its operations by making sure
 * cumulative size of an individual batch is not larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}.
 * If a single operation itself is larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}, that
 * operation would be moved into a batch containing only that operation.
 * @param originalBatch - A batch of operations needed to be checked.
 * @returns
 * @hidden
 */
function splitBatchBasedOnBodySize(originalBatch) {
    if ((originalBatch === null || originalBatch === void 0 ? void 0 : originalBatch.operations) === undefined || originalBatch.operations.length < 1)
        return [];
    let currentBatchSize = calculateObjectSizeInBytes(originalBatch.operations[0]);
    let currentBatch = Object.assign(Object.assign({}, originalBatch), { operations: [originalBatch.operations[0]], indexes: [originalBatch.indexes[0]] });
    const processedBatches = [];
    processedBatches.push(currentBatch);
    for (let index = 1; index < originalBatch.operations.length; index++) {
        const operation = originalBatch.operations[index];
        const currentOpSize = calculateObjectSizeInBytes(operation);
        if (currentBatchSize + currentOpSize > constants_js_1.Constants.DefaultMaxBulkRequestBodySizeInBytes) {
            currentBatch = Object.assign(Object.assign({}, originalBatch), { operations: [], indexes: [] });
            processedBatches.push(currentBatch);
            currentBatchSize = 0;
        }
        currentBatch.operations.push(operation);
        currentBatch.indexes.push(originalBatch.indexes[index]);
        currentBatchSize += currentOpSize;
    }
    return processedBatches;
}
/**
 * Calculates size of an JSON object in bytes with utf-8 encoding.
 * @hidden
 */
function calculateObjectSizeInBytes(obj) {
    return new TextEncoder().encode((0, request_js_1.bodyFromData)(obj)).length;
}
function decorateBatchOperation(operation, options = {}) {
    if (operation.operationType === exports.BulkOperationType.Create ||
        operation.operationType === exports.BulkOperationType.Upsert) {
        if ((operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
            !options.disableAutomaticIdGeneration) {
            operation.resourceBody.id = (0, core_util_1.randomUUID)();
        }
    }
    return operation;
}
function isSuccessStatusCode(statusCode) {
    return statusCode >= 200 && statusCode <= 299;
}
class TaskCompletionSource {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
    }
    get task() {
        return this.promise;
    }
    setResult(value) {
        this.resolveFn(value);
    }
    setException(error) {
        this.rejectFn(error);
    }
}
exports.TaskCompletionSource = TaskCompletionSource;
async function encryptOperationInput(encryptionProcessor, operation, totalPropertiesEncryptedCount) {
    if (Object.prototype.hasOwnProperty.call(operation, "partitionKey")) {
        const partitionKeyInternal = (0, index_js_1.convertToInternalPartitionKey)(operation.partitionKey);
        const { partitionKeyList, encryptedCount } = await encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
        operation.partitionKey = partitionKeyList;
        totalPropertiesEncryptedCount += encryptedCount;
    }
    switch (operation.operationType) {
        case exports.BulkOperationType.Create:
        case exports.BulkOperationType.Upsert: {
            const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(operation.resourceBody);
            operation.resourceBody = body;
            totalPropertiesEncryptedCount += propertiesEncryptedCount;
            break;
        }
        case exports.BulkOperationType.Read:
        case exports.BulkOperationType.Delete:
            if (await encryptionProcessor.isPathEncrypted("/id")) {
                operation.id = await encryptionProcessor.getEncryptedId(operation.id);
                totalPropertiesEncryptedCount++;
            }
            break;
        case exports.BulkOperationType.Replace: {
            if (await encryptionProcessor.isPathEncrypted("/id")) {
                operation.id = await encryptionProcessor.getEncryptedId(operation.id);
                totalPropertiesEncryptedCount++;
            }
            const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(operation.resourceBody);
            operation.resourceBody = body;
            totalPropertiesEncryptedCount += propertiesEncryptedCount;
            break;
        }
        case exports.BulkOperationType.Patch: {
            if (await encryptionProcessor.isPathEncrypted("/id")) {
                operation.id = await encryptionProcessor.getEncryptedId(operation.id);
                totalPropertiesEncryptedCount++;
            }
            const body = operation.resourceBody;
            const patchRequestBody = Array.isArray(body) ? body : body.operations;
            for (const patchOperation of patchRequestBody) {
                if ("value" in patchOperation) {
                    if (await encryptionProcessor.isPathEncrypted(patchOperation.path)) {
                        patchOperation.value = await encryptionProcessor.encryptProperty(patchOperation.path, patchOperation.value);
                        totalPropertiesEncryptedCount++;
                    }
                }
            }
            break;
        }
    }
    return { operation, totalPropertiesEncryptedCount };
}
//# sourceMappingURL=batch.js.map