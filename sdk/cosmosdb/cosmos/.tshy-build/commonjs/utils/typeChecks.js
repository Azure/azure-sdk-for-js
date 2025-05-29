"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotUndefined = assertNotUndefined;
exports.isPrimitivePartitionKeyValue = isPrimitivePartitionKeyValue;
exports.isWellDefinedPartitionKeyValue = isWellDefinedPartitionKeyValue;
exports.isNonePartitionKeyValue = isNonePartitionKeyValue;
exports.isNullPartitionKeyValue = isNullPartitionKeyValue;
exports.isPartitionKey = isPartitionKey;
exports.isPrefixPartitionKey = isPrefixPartitionKey;
const index_js_1 = require("../documents/index.js");
/**
 * Utility function to avoid writing boilder plate code while checking for
 * undefined values. It throws Error if the input value is undefined.
 * @param value - Value which is potentially undefined.
 * @param msg - Error Message to throw if value is undefined.
 * @returns
 */
function assertNotUndefined(value, msg) {
    if (value !== undefined) {
        return value;
    }
    throw new Error(msg || "Unexpected 'undefined' value encountered");
}
/**
 * Check for value being PrimitivePartitionKeyValue.
 * @internal
 */
function isPrimitivePartitionKeyValue(value) {
    return (isWellDefinedPartitionKeyValue(value) ||
        isNonePartitionKeyValue(value) ||
        isNullPartitionKeyValue(value));
}
/**
 * Check for value being string, number or boolean.
 * @internal
 */
function isWellDefinedPartitionKeyValue(value) {
    return typeof value === "string" || typeof value === "boolean" || typeof value === "number";
}
/**
 * Check for value being NonePartitionKeyType.
 * @internal
 */
function isNonePartitionKeyValue(value) {
    return value !== undefined && JSON.stringify(value) === JSON.stringify(index_js_1.NonePartitionKeyLiteral);
}
/**
 * Check for value being NullPartitionKeyType.
 * @internal
 */
function isNullPartitionKeyValue(value) {
    return value === index_js_1.NullPartitionKeyLiteral;
}
/**
 * Verify validity of partition key.
 * @internal
 */
function isPartitionKey(partitionKey) {
    return isPrimitivePartitionKeyValue(partitionKey) || Array.isArray(partitionKey);
}
/**
 * Check for value being PrefixPartitionKey.
 * @internal
 */
function isPrefixPartitionKey(partitionKey, partitionKeyDefinition) {
    return (partitionKeyDefinition &&
        partitionKeyDefinition.paths &&
        partitionKeyDefinition.kind === index_js_1.PartitionKeyKind.MultiHash &&
        Array.isArray(partitionKey) &&
        partitionKey.length < partitionKeyDefinition.paths.length);
}
//# sourceMappingURL=typeChecks.js.map