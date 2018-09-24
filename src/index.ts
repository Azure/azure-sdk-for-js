import * as DocumentBase from "./documents";
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
  MediaReadMode,
  PartitionKey,
  PartitionKeyDefinition,
  PartitionKind,
  PermissionMode,
  QueryCompatibilityMode,
  TriggerOperation,
  TriggerType,
  UserDefinedFunctionType
} from "./documents";

export { DocumentBase, DocumentBase as AzureDocuments };
export { Constants, UriFactory } from "./common";
export { RetryOptions } from "./retry";
export { Response, RequestOptions, FeedOptions, MediaOptions, ErrorResponse } from "./request";
export { IHeaders, SqlParameter, SqlQuerySpec } from "./queryExecutionContext";
export { QueryIterator } from "./queryIterator";
export * from "./queryMetrics";
export { CosmosClient } from "./CosmosClient";
export { CosmosClientOptions } from "./CosmosClientOptions";
export * from "./client";
