"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataLookUpType = exports.CosmosDiagnostics = void 0;
exports.getRootNode = getRootNode;
/**
 *  * This is a Cosmos Diagnostic type that holds collected diagnostic information during a client operations. ie. Item.read(), Container.create().
 * It has three members -
 * 1. `clientSideRequestStatistics` member contains aggregate diagnostic information, including -
 *   - metadata lookups. Here all the server requests, apart from the final intended resource are considered as metadata calls.
 *    i.e. for item.read(id), if the client makes server call to discover endpoints it would be considered as metadata call.
 *   - retries
 *   - endpoints contacted.
 *   - request, response payload stats.
 *   - gatewayStatistics - Information corresponding to main operation. For example during Item.read(), the client might perform many operations
 *    i.e. metadata lookup etc, but gatewayStatistics represents the diagnostics information for actual read operation.
 *
 * 2. diagnosticNode - Is a tree like structure which captures detailed diagnostic information. By default it is disabled, and is intended to be
 * used only for debugging on non production environments. The kind of details captured in diagnosticNode is controlled by `CosmosDbDiagnosticLevel`.
 * - CosmosDbDiagnosticLevel.info - Is default value. In this level only clientSideRequestStatistics are captured. Is is meant for production environments.
 * - CosmosDbDiagnosticLevel.debug - Captures diagnosticNode and clientConfig. No request and response payloads are captured. Is not meant to be used
 * in production environment.
 * - CosmosDbDiagnosticLevel.debug-unsafe - In addition to data captured in CosmosDbDiagnosticLevel.debug, also captures request and response payloads.
 * Is not meant to be used in production environment.
 * 3. clientConfig - Captures information related to how client was configured during initialization.
 */
class CosmosDiagnostics {
    /**
     * @internal
     */
    constructor(clientSideRequestStatistics, diagnosticNode, clientConfig) {
        this.clientSideRequestStatistics = clientSideRequestStatistics;
        this.diagnosticNode = diagnosticNode;
        this.clientConfig = clientConfig;
    }
}
exports.CosmosDiagnostics = CosmosDiagnostics;
/**
 * This is enum for Type of Metadata lookups possible.
 */
var MetadataLookUpType;
(function (MetadataLookUpType) {
    MetadataLookUpType["PartitionKeyRangeLookUp"] = "PARTITION_KEY_RANGE_LOOK_UP";
    MetadataLookUpType["DatabaseAccountLookUp"] = "DATABASE_ACCOUNT_LOOK_UP";
    MetadataLookUpType["QueryPlanLookUp"] = "QUERY_PLAN_LOOK_UP";
    MetadataLookUpType["DatabaseLookUp"] = "DATABASE_LOOK_UP";
    MetadataLookUpType["ContainerLookUp"] = "CONTAINER_LOOK_UP";
})(MetadataLookUpType || (exports.MetadataLookUpType = MetadataLookUpType = {}));
function getRootNode(node) {
    if (node.parent)
        return getRootNode(node.parent);
    else
        return node;
}
//# sourceMappingURL=CosmosDiagnostics.js.map