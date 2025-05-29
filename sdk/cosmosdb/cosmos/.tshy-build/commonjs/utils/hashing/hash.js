"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPartitionKey = hashPartitionKey;
const index_js_1 = require("../../documents/index.js");
const multiHash_js_1 = require("./multiHash.js");
const v1_js_1 = require("./v1.js");
const v2_js_1 = require("./v2.js");
/**
 * Generate hash of a PartitonKey based on it PartitionKeyDefinition.
 * @param partitionKey - to be hashed.
 * @param partitionDefinition - container's partitionKey definition
 * @returns
 */
function hashPartitionKey(partitionKey, partitionDefinition) {
    const kind = (partitionDefinition === null || partitionDefinition === void 0 ? void 0 : partitionDefinition.kind) || index_js_1.PartitionKeyKind.Hash; // Default value.
    const isV2 = partitionDefinition &&
        partitionDefinition.version &&
        partitionDefinition.version === index_js_1.PartitionKeyDefinitionVersion.V2;
    switch (kind) {
        case index_js_1.PartitionKeyKind.Hash:
            return isV2 ? (0, v2_js_1.hashV2PartitionKey)(partitionKey) : (0, v1_js_1.hashV1PartitionKey)(partitionKey);
        case index_js_1.PartitionKeyKind.MultiHash:
            return (0, multiHash_js_1.hashMultiHashPartitionKey)(partitionKey);
    }
}
//# sourceMappingURL=hash.js.map