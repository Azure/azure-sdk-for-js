// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  SparkBatchJobOptions,
  SparkSessionOptions,
  SparkStatementOptions
} from "./models";

export interface SparkBatchGetSparkBatchJobsQueryParamProperties {
  /** Optional param specifying which index the list should begin from. */
  from?: number;
  /**
   * Optional param specifying the size of the returned list.
   *             By default it is 20 and that is the maximum.
   */
  size?: number;
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkBatchGetSparkBatchJobsQueryParam {
  queryParameters?: SparkBatchGetSparkBatchJobsQueryParamProperties;
}

export type SparkBatchGetSparkBatchJobsParameters = RequestParameters &
  SparkBatchGetSparkBatchJobsQueryParam;

export interface SparkBatchCreateSparkBatchJobQueryParamProperties {
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkBatchCreateSparkBatchJobQueryParam {
  queryParameters?: SparkBatchCreateSparkBatchJobQueryParamProperties;
}

export interface SparkBatchCreateSparkBatchJobBodyParam {
  body: SparkBatchJobOptions;
}

export type SparkBatchCreateSparkBatchJobParameters = RequestParameters &
  SparkBatchCreateSparkBatchJobQueryParam &
  SparkBatchCreateSparkBatchJobBodyParam;

export interface SparkBatchGetSparkBatchJobQueryParamProperties {
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkBatchGetSparkBatchJobQueryParam {
  queryParameters?: SparkBatchGetSparkBatchJobQueryParamProperties;
}

export type SparkBatchGetSparkBatchJobParameters = RequestParameters &
  SparkBatchGetSparkBatchJobQueryParam;
export type SparkBatchCancelSparkBatchJobParameters = RequestParameters;

export interface SparkSessionGetSparkSessionsQueryParamProperties {
  /** Optional param specifying which index the list should begin from. */
  from?: number;
  /**
   * Optional param specifying the size of the returned list.
   *             By default it is 20 and that is the maximum.
   */
  size?: number;
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkSessionGetSparkSessionsQueryParam {
  queryParameters?: SparkSessionGetSparkSessionsQueryParamProperties;
}

export type SparkSessionGetSparkSessionsParameters = RequestParameters &
  SparkSessionGetSparkSessionsQueryParam;

export interface SparkSessionCreateSparkSessionQueryParamProperties {
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkSessionCreateSparkSessionQueryParam {
  queryParameters?: SparkSessionCreateSparkSessionQueryParamProperties;
}

export interface SparkSessionCreateSparkSessionBodyParam {
  body: SparkSessionOptions;
}

export type SparkSessionCreateSparkSessionParameters = RequestParameters &
  SparkSessionCreateSparkSessionQueryParam &
  SparkSessionCreateSparkSessionBodyParam;

export interface SparkSessionGetSparkSessionQueryParamProperties {
  /** Optional query param specifying whether detailed response is returned beyond plain livy. */
  detailed?: boolean;
}

export interface SparkSessionGetSparkSessionQueryParam {
  queryParameters?: SparkSessionGetSparkSessionQueryParamProperties;
}

export type SparkSessionGetSparkSessionParameters = RequestParameters &
  SparkSessionGetSparkSessionQueryParam;
export type SparkSessionCancelSparkSessionParameters = RequestParameters;
export type SparkSessionResetSparkSessionTimeoutParameters = RequestParameters;
export type SparkSessionGetSparkStatementsParameters = RequestParameters;

export interface SparkSessionCreateSparkStatementBodyParam {
  body: SparkStatementOptions;
}

export type SparkSessionCreateSparkStatementParameters = RequestParameters &
  SparkSessionCreateSparkStatementBodyParam;
export type SparkSessionGetSparkStatementParameters = RequestParameters;
export type SparkSessionCancelSparkStatementParameters = RequestParameters;
