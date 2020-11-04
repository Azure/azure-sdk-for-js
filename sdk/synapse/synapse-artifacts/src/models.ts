// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { OperationOptions } from "@azure/core-http";
import { HttpResponse } from "@azure/core-http";

export {
  SparkBatchGetSparkBatchJobResponse as GetSparkBatchJobResponse,
  SparkBatchGetSparkBatchJobsResponse as ListSparkBatchJobResponse,
  SparkBatchCreateSparkBatchJobResponse as CreateSparkBatchJobResponse,
  SparkSessionGetSparkSessionResponse as GetSparkSessionResponse,
  SparkSessionGetSparkSessionsResponse as ListSparkSessionResponse,
  SparkSessionCreateSparkSessionResponse as CreateSparkSessionResponse,
  SparkSessionGetSparkStatementResponse as GetSparkStatementResponse,
  SparkSessionGetSparkStatementsResponse as ListSparkStatementResponse,
  SparkSessionCreateSparkStatementResponse as CreateSparkStatementResponse,
  SparkBatchJobCollection,
  SparkBatchJob,
  SparkBatchJobState,
  SparkRequest,
  SparkScheduler,
  SparkServicePlugin,
  SparkServiceError,
  SparkBatchJobOptions,
  SparkSessionCollection,
  SparkSession,
  SparkSessionState,
  SparkSessionOptions,
  SparkStatementCollection,
  SparkStatement,
  SparkStatementOutput,
  SparkStatementOptions,
  SparkStatementCancellationResult,
  SparkJobType,
  SparkBatchJobResultType,
  SchedulerCurrentState,
  PluginCurrentState,
  SparkErrorSource,
  SparkSessionResultType,
  SparkStatementLanguageType
} from "./generated/models";

/**
 * Options to create spark client.
 */
export interface SparkClientOptions extends PipelineOptions {
  /**
   * Valid api-version for the request.
   */
  livyApiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}

/**
 * Options to get a role definition.
 */
export {
  SparkBatchGetSparkBatchJobOptionalParams as GetSparkBatchJobOptions,
  SparkBatchGetSparkBatchJobsOptionalParams as ListSparkBatchJobOptions,
  SparkBatchCreateSparkBatchJobOptionalParams as CreateSparkBatchJobOptions,
  SparkSessionGetSparkSessionOptionalParams as GetSparkSessionOptions,
  SparkSessionGetSparkSessionsOptionalParams as ListSparkSessionOptions,
  SparkSessionCreateSparkSessionOptionalParams as CreateSparkSessionOptions
} from "./generated/models";

// /**
//  * Options to delete role assignment.
//  */
export type CancelSparkBatchJobOptions = OperationOptions;

// /**
//  * Options to delete role assignment.
//  */
export type CancelSparkSessionOptions = OperationOptions;

export type ResetSparkSessionTimeoutOptions = OperationOptions;

/**
 * Options to get a role definition.
 */
export type GetSparkStatementOptions = OperationOptions;

// /**
//  * Options to list role definitions.
//  */
export type ListSparkStatementOptions = OperationOptions;

// /**
//  * Options to create role assignment.
//  */
export type CreateSparkStatementOptions = OperationOptions;

// /**
//  * Options to delete role assignment.
//  */
export type CancelSparkStatementOptions = OperationOptions;

// /**
//  * Arguments for retrieving the next page of search results.
//  */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

// /**
//  * Represents the repsonse for operations
//  */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}

// export interface RoleAssignmentsListResponse {
//   /**
//    * List of Synapse role assignments.
//    */
//   value: string[];
// }

// /**
//  * Represents an object with a non-enumerable _response property which provides
//  */
// export type WithResponse<T> = T & { _response: HttpResponse };
export interface ArtifactsClientOptions extends PipelineOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
