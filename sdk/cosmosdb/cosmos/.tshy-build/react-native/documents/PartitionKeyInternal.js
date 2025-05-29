// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @hidden
 * None PartitionKey Literal
 */
export const NonePartitionKeyLiteral = {};
/**
 * @hidden
 * Null PartitionKey Literal
 */
export const NullPartitionKeyLiteral = null;
/**
 * @hidden
 * Maps PartitionKey to InternalPartitionKey.
 * @param partitionKey - PartitonKey to be converted.
 * @returns PartitionKeyInternal
 */
export function convertToInternalPartitionKey(partitionKey) {
    if (Array.isArray(partitionKey)) {
        return partitionKey.map((key) => (key === undefined ? NonePartitionKeyLiteral : key));
    }
    else
        return [partitionKey];
}
//# sourceMappingURL=PartitionKeyInternal.js.map