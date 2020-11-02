// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { OperationOptions } from "@azure/core-http";
import { HttpResponse } from "@azure/core-http";

export {
  SparkBatchGetSparkBatchJobOptionalParams as GetSparkBatchJobOptions,
  SparkBatchGetSparkBatchJobsOptionalParams as ListSparkBatchJobsOptions,
  SparkBatchCreateSparkBatchJobOptionalParams as CreateSparkBatchJobOptions,
  SparkSessionGetSparkSessionOptionalParams as GetSparkSessionOptions,
  SparkSessionGetSparkSessionsOptionalParams as ListSparkSessionsOptions,
  SparkSessionCreateSparkSessionOptionalParams as CreateSparkSessionOptions,
  SparkBatchGetSparkBatchJobResponse as GetSparkBatchJobResponse,
  SparkBatchGetSparkBatchJobsResponse as ListSparkBatchJobsResponse,
  SparkBatchCreateSparkBatchJobResponse as CreateSparkBatchJobResponse,
  SparkSessionGetSparkSessionResponse as GetSparkSessionResponse,
  SparkSessionGetSparkSessionsResponse as ListSparkSessionsResponse,
  SparkSessionCreateSparkSessionResponse as CreateSparkSessionResponse,
  SparkSessionGetSparkStatementResponse as GetSparkStatementResponse,
  SparkSessionGetSparkStatementsResponse as ListSparkStatementsResponse,
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

export type CancelSparkBatchJobOptions = OperationOptions;

export type CancelSparkSessionOptions = OperationOptions;

export type ResetSparkSessionTimeoutOptions = OperationOptions;

export type GetSparkStatementOptions = OperationOptions;

export type ListSparkStatementsOptions = OperationOptions;

export type CreateSparkStatementOptions = OperationOptions;

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
