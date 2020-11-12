// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse, OperationOptions, PipelineOptions } from "@azure/core-http";

export {
  SparkBatchGetSparkBatchJobOptionalParams as GetSparkBatchJobOptions,
  SparkBatchGetSparkBatchJobsOptionalParams as ListSparkBatchJobsOptions,
  SparkBatchCreateSparkBatchJobOptionalParams as CreateSparkBatchJobOptions,
  SparkSessionGetSparkSessionOptionalParams as GetSparkSessionOptions,
  SparkSessionGetSparkSessionsOptionalParams as ListSparkSessionsOptions,
  SparkSessionCreateSparkSessionOptionalParams as CreateSparkSessionOptions,
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
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T extends object> = T & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: T;
  };
};

/**
 * Options to create spark client.
 */
export interface SparkClientOptions extends PipelineOptions {}

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
