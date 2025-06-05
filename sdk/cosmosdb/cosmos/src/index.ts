// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys.js";
export { StatusCodes, StatusCodesType, PartitionKeyRangePropertiesNames } from "./common/index.js";
export { setAuthorizationTokenHeaderUsingMasterKey } from "./auth.js";
export {
  Operation,
  OperationResponse,
  BulkOptions,
  CreateOperation,
  UpsertOperation,
  ReplaceOperation,
  DeleteOperation,
  ReadOperation,
  OperationBase,
  OperationWithItem,
  OperationInput,
  BulkOperationType,
  ExtendedOperationResponse,
  BulkOperationResponse,
  CreateOperationInput,
  UpsertOperationInput,
  ReplaceOperationInput,
  ReadOperationInput,
  DeleteOperationInput,
  PatchOperationInput,
  BulkPatchOperation,
  BulkOperationResult,
} from "./utils/batch.js";
export {
  PatchOperation,
  PatchOperationType,
  ExistingKeyOperation,
  RemoveOperation,
  PatchRequestBody,
} from "./utils/patch.js";
export {
  ConnectionMode,
  ConsistencyLevel,
  ConnectionPolicy,
  DatabaseAccount,
  DataType,
  Index,
  IndexedPath,
  IndexingMode,
  IndexingPolicy,
  SpatialIndex,
  SpatialType,
  GeospatialType,
  IndexKind,
  Location,
  PartitionKey,
  PrimitivePartitionKeyValue,
  NullPartitionKeyType,
  NonePartitionKeyType,
  PartitionKeyKind,
  PartitionKeyDefinition,
  PartitionKeyDefinitionVersion,
  PartitionKeyBuilder,
  PermissionMode,
  PriorityLevel,
  TriggerOperation,
  TriggerType,
  UserDefinedFunctionType,
  CompositePath,
  ComputedProperty,
  VectorEmbeddingPolicy,
  VectorIndex,
  VectorEmbedding,
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
  FullTextIndex,
  FullTextPolicy,
  FullTextPath,
} from "./documents/index.js";

export { UniqueKeyPolicy, UniqueKey } from "./client/Container/UniqueKeyPolicy.js";
export { ContainerRequest } from "./client/Container/ContainerRequest.js";
export { Constants, OperationType, ResourceType, HTTPMethod } from "./common/index.js";
export { RetryOptions } from "./retry/index.js";
export * from "./request/index.js";

export {
  DiagnosticNodeInternal,
  DiagnosticDataValue,
  DiagnosticNodeType,
} from "./diagnostics/DiagnosticNodeInternal.js";

export {
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
export { CosmosClientOptions, Agent } from "./CosmosClientOptions.js";
export * from "./client/index.js";
export { Scripts } from "./client/Script/Scripts.js";
export { Next, Plugin, PluginConfig, PluginOn } from "./plugins/Plugin.js";
export { TokenProvider, RequestInfo } from "./auth.js";

export { ChangeFeedIterator } from "./ChangeFeedIterator.js";
export { ChangeFeedOptions } from "./ChangeFeedOptions.js";
export { ChangeFeedResponse } from "./ChangeFeedResponse.js";
export { ClientContext } from "./ClientContext.js";

export {
  CosmosDiagnostics,
  MetadataLookUpDiagnostic,
  MetadataLookUpDiagnostics,
  MetadataLookUpType,
  RetryDiagnostics,
  FailedRequestAttemptDiagnostic,
  GatewayStatistics,
  ClientSideRequestStatistics,
  ClientConfigDiagnostic,
  DiagnosticNode,
  EncryptionDiagnostics,
} from "./CosmosDiagnostics.js";

export {
  ChangeFeedPullModelIterator,
  ChangeFeedIteratorOptions,
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
  ClientEncryptionIncludedPath,
  ClientEncryptionPolicy,
  ClientEncryptionKeyProperties,
  EncryptionKeyWrapMetadata,
  EncryptionQueryBuilder,
  ClientEncryptionKeyRequest,
  ClientEncryptionKeyResponse,
  EncryptionKeyResolver,
  AzureKeyVaultEncryptionKeyResolver,
  EncryptionType,
  EncryptionAlgorithm,
  EncryptionKeyResolverName,
  ClientEncryptionOptions,
  CosmosEncryptedNumber,
  CosmosEncryptedNumberType,
} from "./encryption/index.js";
