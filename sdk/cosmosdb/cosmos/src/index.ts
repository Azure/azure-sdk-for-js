// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys.js";
export {
  StatusCodes,
  type StatusCodesType,
  type PartitionKeyRangePropertiesNames,
} from "./common/index.js";
export { setAuthorizationTokenHeaderUsingMasterKey } from "./auth.js";
export {
  type Operation,
  type OperationResponse,
  type BulkOptions,
  type CreateOperation,
  type UpsertOperation,
  type ReplaceOperation,
  type DeleteOperation,
  type ReadOperation,
  type OperationBase,
  type OperationWithItem,
  type OperationInput,
  BulkOperationType,
  type ExtendedOperationResponse,
  type BulkOperationResponse,
  type CreateOperationInput,
  type UpsertOperationInput,
  type ReplaceOperationInput,
  type ReadOperationInput,
  type DeleteOperationInput,
  type PatchOperationInput,
  type BulkPatchOperation,
  type BulkOperationResult,
} from "./utils/batch.js";
export {
  type PatchOperation,
  PatchOperationType,
  type ExistingKeyOperation,
  type RemoveOperation,
  type PatchRequestBody,
} from "./utils/patch.js";
export {
  ConnectionMode,
  ConsistencyLevel,
  type ConnectionPolicy,
  DatabaseAccount,
  DataType,
  type Index,
  type IndexedPath,
  IndexingMode,
  type IndexingPolicy,
  type SpatialIndex,
  SpatialType,
  GeospatialType,
  IndexKind,
  type Location,
  type PartitionKey,
  type PrimitivePartitionKeyValue,
  type NullPartitionKeyType,
  type NonePartitionKeyType,
  PartitionKeyKind,
  type PartitionKeyDefinition,
  PartitionKeyDefinitionVersion,
  PartitionKeyBuilder,
  PermissionMode,
  PriorityLevel,
  TriggerOperation,
  TriggerType,
  UserDefinedFunctionType,
  type CompositePath,
  type ComputedProperty,
  type VectorEmbeddingPolicy,
  type VectorIndex,
  type VectorEmbedding,
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
  type FullTextIndex,
  type FullTextPolicy,
  type FullTextPath,
} from "./documents/index.js";

export type { UniqueKeyPolicy, UniqueKey } from "./client/Container/UniqueKeyPolicy.js";
export type { ContainerRequest } from "./client/Container/ContainerRequest.js";
export { Constants, OperationType, ResourceType, HTTPMethod } from "./common/index.js";
export type { RetryOptions } from "./retry/index.js";
export * from "./request/index.js";

export {
  DiagnosticNodeInternal,
  type DiagnosticDataValue,
  DiagnosticNodeType,
} from "./diagnostics/DiagnosticNodeInternal.js";

export type {
  CosmosHeaders,
  SqlParameter,
  SqlQuerySpec,
  JSONValue,
  JSONArray,
  JSONObject,
} from "./queryExecutionContext/index.js";
export { QueryIterator } from "./queryIterator.js";
export * from "./queryMetrics/index.js";
export { CosmosClient } from "./CosmosClient.js";
export type { CosmosClientOptions, Agent } from "./CosmosClientOptions.js";
export * from "./client/index.js";
export { Scripts } from "./client/Script/Scripts.js";
export { type Next, type Plugin, type PluginConfig, PluginOn } from "./plugins/Plugin.js";
export type { TokenProvider, RequestInfo } from "./auth.js";

export { ChangeFeedIterator } from "./ChangeFeedIterator.js";
export type { ChangeFeedOptions } from "./ChangeFeedOptions.js";
export { ChangeFeedResponse } from "./ChangeFeedResponse.js";
export { ClientContext } from "./ClientContext.js";

export {
  CosmosDiagnostics,
  type MetadataLookUpDiagnostic,
  type MetadataLookUpDiagnostics,
  MetadataLookUpType,
  type RetryDiagnostics,
  type FailedRequestAttemptDiagnostic,
  type GatewayStatistics,
  type ClientSideRequestStatistics,
  type ClientConfigDiagnostic,
  type DiagnosticNode,
  type EncryptionDiagnostics,
} from "./CosmosDiagnostics.js";

export {
  type ChangeFeedPullModelIterator,
  type ChangeFeedIteratorOptions,
  ChangeFeedIteratorResponse,
  ChangeFeedStartFrom,
  FeedRange,
  ChangeFeedMode,
  ChangeFeedPolicy,
  ChangeFeedRetentionTimeSpan,
} from "./client/ChangeFeed/index.js";
export { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";

export { GlobalEndpointManager } from "./globalEndpointManager.js";
export { SasTokenPermissionKind } from "./common/constants.js";
export { createAuthorizationSasToken } from "./utils/SasToken.js";
export { RestError } from "@azure/core-rest-pipeline";
export { AbortError } from "@azure/abort-controller";
export * from "./encryption/enums/index.js";
export * from "./encryption/ClientEncryptionKey/index.js";
export * from "./encryption/EncryptionKeyResolver/index.js";
export {
  type ClientEncryptionIncludedPath,
  type ClientEncryptionPolicy,
  type ClientEncryptionKeyProperties,
  type EncryptionKeyWrapMetadata,
  EncryptionQueryBuilder,
  type ClientEncryptionKeyRequest,
  ClientEncryptionKeyResponse,
  type EncryptionKeyResolver,
  AzureKeyVaultEncryptionKeyResolver,
  EncryptionType,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  type ClientEncryptionOptions,
  type CosmosEncryptedNumber,
  CosmosEncryptedNumberType,
} from "./encryption/index.js";

export type {
  RerankScore,
  SemanticRerankResult,
  SemanticRerankOptions,
} from "./inference/index.js";
