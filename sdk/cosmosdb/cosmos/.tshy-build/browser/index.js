// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys.js";
export { StatusCodes } from "./common/index.js";
export { setAuthorizationTokenHeaderUsingMasterKey } from "./auth.js";
export { BulkOperationType, } from "./utils/batch.js";
export { PatchOperationType, } from "./utils/patch.js";
export { ConnectionMode, ConsistencyLevel, DatabaseAccount, DataType, IndexingMode, SpatialType, GeospatialType, IndexKind, PartitionKeyKind, PartitionKeyDefinitionVersion, PartitionKeyBuilder, PermissionMode, PriorityLevel, TriggerOperation, TriggerType, UserDefinedFunctionType, VectorEmbeddingDataType, VectorEmbeddingDistanceFunction, VectorIndexType, } from "./documents/index.js";
export { Constants, OperationType, ResourceType, HTTPMethod } from "./common/index.js";
export * from "./request/index.js";
export { DiagnosticNodeInternal, DiagnosticNodeType, } from "./diagnostics/DiagnosticNodeInternal.js";
export { QueryIterator } from "./queryIterator.js";
export * from "./queryMetrics/index.js";
export { CosmosClient } from "./CosmosClient.js";
export * from "./client/index.js";
export { Scripts } from "./client/Script/Scripts.js";
export { PluginOn } from "./plugins/Plugin.js";
export { ChangeFeedIterator } from "./ChangeFeedIterator.js";
export { ChangeFeedResponse } from "./ChangeFeedResponse.js";
export { ClientContext } from "./ClientContext.js";
export { CosmosDiagnostics, MetadataLookUpType, } from "./CosmosDiagnostics.js";
export { ChangeFeedIteratorResponse, ChangeFeedStartFrom, FeedRange, ChangeFeedMode, ChangeFeedPolicy, ChangeFeedRetentionTimeSpan, } from "./client/ChangeFeed/index.js";
export { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";
export { GlobalEndpointManager } from "./globalEndpointManager.js";
export { SasTokenPermissionKind } from "./common/constants.js";
export { createAuthorizationSasToken } from "./utils/SasToken.js";
export { RestError } from "@azure/core-rest-pipeline";
export { AbortError } from "@azure/abort-controller";
export * from "./encryption/enums/index.js";
export * from "./encryption/ClientEncryptionKey/index.js";
export * from "./encryption/EncryptionKeyResolver/index.js";
export { EncryptionQueryBuilder, ClientEncryptionKeyResponse, AzureKeyVaultEncryptionKeyResolver, EncryptionType, EncryptionAlgorithm, EncryptionKeyResolverName, CosmosEncryptedNumberType, } from "./encryption/index.js";
//# sourceMappingURL=index.js.map