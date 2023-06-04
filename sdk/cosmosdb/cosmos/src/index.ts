// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys";
export { StatusCodes, StatusCodesType, PartitionKeyRangePropertiesNames } from "./common";
export { extractPartitionKeys as extractPartitionKey } from "./extractPartitionKey";
export { setAuthorizationTokenHeaderUsingMasterKey } from "./auth";
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
  CreateOperationInput,
  UpsertOperationInput,
  ReplaceOperationInput,
  ReadOperationInput,
  DeleteOperationInput,
  PatchOperationInput,
  BulkPatchOperation,
} from "./utils/batch";
export {
  PatchOperation,
  PatchOperationType,
  ExistingKeyOperation,
  RemoveOperation,
  PatchRequestBody,
} from "./utils/patch";
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
  PermissionMode,
  TriggerOperation,
  TriggerType,
  UserDefinedFunctionType,
} from "./documents";

export { UniqueKeyPolicy, UniqueKey } from "./client/Container/UniqueKeyPolicy";
export { ContainerRequest } from "./client/Container/ContainerRequest";
export { Constants, OperationType, ResourceType, HTTPMethod } from "./common";
export { RetryOptions } from "./retry";
export * from "./request";

export {
  CosmosHeaders,
  SqlParameter,
  SqlQuerySpec,
  JSONValue,
  JSONArray,
  JSONObject,
} from "./queryExecutionContext";
export { QueryIterator } from "./queryIterator";
export * from "./queryMetrics";
export { CosmosClient } from "./CosmosClient";
export { CosmosClientOptions, Agent } from "./CosmosClientOptions";
export * from "./client";
export { Scripts } from "./client/Script/Scripts";
export { Next, Plugin, PluginConfig, PluginOn } from "./plugins/Plugin";
export { TokenProvider, RequestInfo } from "./auth";

export { ChangeFeedIterator } from "./ChangeFeedIterator";
export { ChangeFeedOptions } from "./ChangeFeedOptions";
export { ChangeFeedResponse } from "./ChangeFeedResponse";
export { ClientContext } from "./ClientContext";

export {
  CosmosDiagnostics,
  MetadataLookUpDiagnostics,
  RetryDiagnostics,
  MetadataLookUpDiagnostic,
  FailedRequestAttemptDiagnostic,
  MetadataLookUpType,
  ClientSideRequestStatistics,
} from "./CosmosDiagnostics";

export { GlobalEndpointManager } from "./globalEndpointManager";
export { SasTokenPermissionKind } from "./common/constants";
export { createAuthorizationSasToken } from "./utils/SasToken";
export { RestError } from "@azure/core-rest-pipeline";
export { AbortError } from "@azure/abort-controller";
