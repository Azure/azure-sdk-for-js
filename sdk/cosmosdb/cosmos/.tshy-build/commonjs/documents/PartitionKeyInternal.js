"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullPartitionKeyLiteral = exports.NonePartitionKeyLiteral = void 0;
exports.convertToInternalPartitionKey = convertToInternalPartitionKey;
/**
 * @hidden
 * None PartitionKey Literal
 */
exports.NonePartitionKeyLiteral = {};
/**
 * @hidden
 * Null PartitionKey Literal
 */
exports.NullPartitionKeyLiteral = null;
/**
 * @hidden
 * Maps PartitionKey to InternalPartitionKey.
 * @param partitionKey - PartitonKey to be converted.
 * @returns PartitionKeyInternal
 */
function convertToInternalPartitionKey(partitionKey) {
    if (Array.isArray(partitionKey)) {
        return partitionKey.map((key) => (key === undefined ? exports.NonePartitionKeyLiteral : key));
    }
    else
        return [partitionKey];
}
//# sourceMappingURL=PartitionKeyInternal.js.map