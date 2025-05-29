// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { extractPartitionKeys, undefinedPartitionKey } from "../extractPartitionKey.js";
import { NonePartitionKeyLiteral, convertToInternalPartitionKey } from "../documents/index.js";
import { assertNotUndefined } from "./typeChecks.js";
import { bodyFromData } from "../request/request.js";
import { Constants } from "../common/constants.js";
import { randomUUID } from "@azure/core-util";
export function isKeyInRange(min, max, key) {
    const isAfterMinInclusive = key.localeCompare(min) >= 0;
    const isBeforeMax = key.localeCompare(max) < 0;
    return isAfterMinInclusive && isBeforeMax;
}
export const BulkOperationType = {
    Create: "Create",
    Upsert: "Upsert",
    Read: "Read",
    Delete: "Delete",
    Replace: "Replace",
    Patch: "Patch",
};
export function hasResource(operation) {
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
export function prepareOperations(operationInput, definition, options = {}) {
    populateIdsIfNeeded(operationInput, options);
    let partitionKey;
    if (Object.prototype.hasOwnProperty.call(operationInput, "partitionKey")) {
        if (operationInput.partitionKey === undefined) {
            partitionKey = definition.paths.map(() => NonePartitionKeyLiteral);
        }
        else {
            partitionKey = convertToInternalPartitionKey(operationInput.partitionKey);
        }
    }
    else {
        switch (operationInput.operationType) {
            case BulkOperationType.Create:
            case BulkOperationType.Replace:
            case BulkOperationType.Upsert:
                partitionKey = assertNotUndefined(extractPartitionKeys(operationInput.resourceBody, definition), "Unexpected undefined Partition Key Found.");
                break;
            case BulkOperationType.Read:
            case BulkOperationType.Delete:
            case BulkOperationType.Patch:
                partitionKey = undefinedPartitionKey(definition);
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
    if (operationInput.operationType === BulkOperationType.Create ||
        operationInput.operationType === BulkOperationType.Upsert) {
        if ((operationInput.resourceBody.id === undefined || operationInput.resourceBody.id === "") &&
            !options.disableAutomaticIdGeneration) {
            operationInput.resourceBody.id = randomUUID();
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
export function splitBatchBasedOnBodySize(originalBatch) {
    if ((originalBatch === null || originalBatch === void 0 ? void 0 : originalBatch.operations) === undefined || originalBatch.operations.length < 1)
        return [];
    let currentBatchSize = calculateObjectSizeInBytes(originalBatch.operations[0]);
    let currentBatch = Object.assign(Object.assign({}, originalBatch), { operations: [originalBatch.operations[0]], indexes: [originalBatch.indexes[0]] });
    const processedBatches = [];
    processedBatches.push(currentBatch);
    for (let index = 1; index < originalBatch.operations.length; index++) {
        const operation = originalBatch.operations[index];
        const currentOpSize = calculateObjectSizeInBytes(operation);
        if (currentBatchSize + currentOpSize > Constants.DefaultMaxBulkRequestBodySizeInBytes) {
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
export function calculateObjectSizeInBytes(obj) {
    return new TextEncoder().encode(bodyFromData(obj)).length;
}
export function decorateBatchOperation(operation, options = {}) {
    if (operation.operationType === BulkOperationType.Create ||
        operation.operationType === BulkOperationType.Upsert) {
        if ((operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
            !options.disableAutomaticIdGeneration) {
            operation.resourceBody.id = randomUUID();
        }
    }
    return operation;
}
export function isSuccessStatusCode(statusCode) {
    return statusCode >= 200 && statusCode <= 299;
}
export class TaskCompletionSource {
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
export async function encryptOperationInput(encryptionProcessor, operation, totalPropertiesEncryptedCount) {
    if (Object.prototype.hasOwnProperty.call(operation, "partitionKey")) {
        const partitionKeyInternal = convertToInternalPartitionKey(operation.partitionKey);
        const { partitionKeyList, encryptedCount } = await encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
        operation.partitionKey = partitionKeyList;
        totalPropertiesEncryptedCount += encryptedCount;
    }
    switch (operation.operationType) {
        case BulkOperationType.Create:
        case BulkOperationType.Upsert: {
            const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(operation.resourceBody);
            operation.resourceBody = body;
            totalPropertiesEncryptedCount += propertiesEncryptedCount;
            break;
        }
        case BulkOperationType.Read:
        case BulkOperationType.Delete:
            if (await encryptionProcessor.isPathEncrypted("/id")) {
                operation.id = await encryptionProcessor.getEncryptedId(operation.id);
                totalPropertiesEncryptedCount++;
            }
            break;
        case BulkOperationType.Replace: {
            if (await encryptionProcessor.isPathEncrypted("/id")) {
                operation.id = await encryptionProcessor.getEncryptedId(operation.id);
                totalPropertiesEncryptedCount++;
            }
            const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(operation.resourceBody);
            operation.resourceBody = body;
            totalPropertiesEncryptedCount += propertiesEncryptedCount;
            break;
        }
        case BulkOperationType.Patch: {
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