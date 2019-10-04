// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys";
export { StatusCodes } from "./common";
export { extractPartitionKey } from "./extractPartitionKey";
export { setAuthorizationTokenHeaderUsingMasterKey } from "./auth";
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
  IndexKind,
  Location,
  PartitionKey,
  PartitionKeyDefinition,
  PermissionMode,
  TriggerOperation,
  TriggerType,
  UserDefinedFunctionType
} from "./documents";

export { UniqueKeyPolicy, UniqueKey } from "./client/Container/UniqueKeyPolicy";
export { Constants, OperationType } from "./common";
export { RetryOptions } from "./retry";
export { Response, RequestOptions, FeedOptions, ErrorResponse, ResourceResponse } from "./request";
export { FeedResponse } from "./request/FeedResponse";
export { RequestContext } from "./request/RequestContext";
export { CosmosHeaders, SqlParameter, SqlQuerySpec } from "./queryExecutionContext";
export { QueryIterator } from "./queryIterator";
export * from "./queryMetrics";
export { CosmosClient } from "./CosmosClient";
export { CosmosClientOptions } from "./CosmosClientOptions";
export * from "./client";
export { Next, Plugin, PluginConfig, PluginOn } from "./plugins/Plugin";
export { TokenProvider, RequestInfo } from "./auth";
