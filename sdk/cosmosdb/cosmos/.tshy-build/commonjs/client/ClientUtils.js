"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPartitionKeyDefinition = readPartitionKeyDefinition;
async function readPartitionKeyDefinition(diagnosticNode, container) {
    const partitionKeyDefinition = await container.readPartitionKeyDefinition(diagnosticNode);
    return partitionKeyDefinition.resource;
}
//# sourceMappingURL=ClientUtils.js.map