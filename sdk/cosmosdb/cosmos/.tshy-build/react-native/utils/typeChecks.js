// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NonePartitionKeyLiteral, NullPartitionKeyLiteral, PartitionKeyKind, } from "../documents/index.js";
/**
 * Utility function to avoid writing boilder plate code while checking for
 * undefined values. It throws Error if the input value is undefined.
 * @param value - Value which is potentially undefined.
 * @param msg - Error Message to throw if value is undefined.
 * @returns
 */
export function assertNotUndefined(value, msg) {
    if (value !== undefined) {
        return value;
    }
    throw new Error(msg || "Unexpected 'undefined' value encountered");
}
/**
 * Check for value being PrimitivePartitionKeyValue.
 * @internal
 */
export function isPrimitivePartitionKeyValue(value) {
    return (isWellDefinedPartitionKeyValue(value) ||
        isNonePartitionKeyValue(value) ||
        isNullPartitionKeyValue(value));
}
/**
 * Check for value being string, number or boolean.
 * @internal
 */
export function isWellDefinedPartitionKeyValue(value) {
    return typeof value === "string" || typeof value === "boolean" || typeof value === "number";
}
/**
 * Check for value being NonePartitionKeyType.
 * @internal
 */
export function isNonePartitionKeyValue(value) {
    return value !== undefined && JSON.stringify(value) === JSON.stringify(NonePartitionKeyLiteral);
}
/**
 * Check for value being NullPartitionKeyType.
 * @internal
 */
export function isNullPartitionKeyValue(value) {
    return value === NullPartitionKeyLiteral;
}
/**
 * Verify validity of partition key.
 * @internal
 */
export function isPartitionKey(partitionKey) {
    return isPrimitivePartitionKeyValue(partitionKey) || Array.isArray(partitionKey);
}
/**
 * Check for value being PrefixPartitionKey.
 * @internal
 */
export function isPrefixPartitionKey(partitionKey, partitionKeyDefinition) {
    return (partitionKeyDefinition &&
        partitionKeyDefinition.paths &&
        partitionKeyDefinition.kind === PartitionKeyKind.MultiHash &&
        Array.isArray(partitionKey) &&
        partitionKey.length < partitionKeyDefinition.paths.length);
}
//# sourceMappingURL=typeChecks.js.map