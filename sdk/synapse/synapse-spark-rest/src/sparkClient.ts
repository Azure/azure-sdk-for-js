// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SparkBatchGetSparkBatchJobsParameters,
  SparkBatchCreateSparkBatchJobParameters,
  SparkBatchGetSparkBatchJobParameters,
  SparkBatchCancelSparkBatchJobParameters,
  SparkSessionGetSparkSessionsParameters,
  SparkSessionCreateSparkSessionParameters,
  SparkSessionGetSparkSessionParameters,
  SparkSessionCancelSparkSessionParameters,
  SparkSessionResetSparkSessionTimeoutParameters,
  SparkSessionGetSparkStatementsParameters,
  SparkSessionCreateSparkStatementParameters,
  SparkSessionGetSparkStatementParameters,
  SparkSessionCancelSparkStatementParameters
} from "./parameters";
import {
  SparkBatchGetSparkBatchJobs200Response,
  SparkBatchCreateSparkBatchJob200Response,
  SparkBatchGetSparkBatchJob200Response,
  SparkBatchCancelSparkBatchJob200Response,
  SparkSessionGetSparkSessions200Response,
  SparkSessionCreateSparkSession200Response,
  SparkSessionGetSparkSession200Response,
  SparkSessionCancelSparkSession200Response,
  SparkSessionResetSparkSessionTimeout200Response,
  SparkSessionGetSparkStatements200Response,
  SparkSessionCreateSparkStatement200Response,
  SparkSessionGetSparkStatement200Response,
  SparkSessionCancelSparkStatement200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface SparkBatchGetSparkBatchJobs {
  /** List all spark batch jobs which are running under a particular spark pool. */
  get(
    options?: SparkBatchGetSparkBatchJobsParameters
  ): Promise<SparkBatchGetSparkBatchJobs200Response>;
  /** Create new spark batch job. */
  post(
    options: SparkBatchCreateSparkBatchJobParameters
  ): Promise<SparkBatchCreateSparkBatchJob200Response>;
}

export interface SparkBatchGetSparkBatchJob {
  /** Gets a single spark batch job. */
  get(
    options?: SparkBatchGetSparkBatchJobParameters
  ): Promise<SparkBatchGetSparkBatchJob200Response>;
  /** Cancels a running spark batch job. */
  delete(
    options?: SparkBatchCancelSparkBatchJobParameters
  ): Promise<SparkBatchCancelSparkBatchJob200Response>;
}

export interface SparkSessionGetSparkSessions {
  /** List all spark sessions which are running under a particular spark pool. */
  get(
    options?: SparkSessionGetSparkSessionsParameters
  ): Promise<SparkSessionGetSparkSessions200Response>;
  /** Create new spark session. */
  post(
    options: SparkSessionCreateSparkSessionParameters
  ): Promise<SparkSessionCreateSparkSession200Response>;
}

export interface SparkSessionGetSparkSession {
  /** Gets a single spark session. */
  get(
    options?: SparkSessionGetSparkSessionParameters
  ): Promise<SparkSessionGetSparkSession200Response>;
  /** Cancels a running spark session. */
  delete(
    options?: SparkSessionCancelSparkSessionParameters
  ): Promise<SparkSessionCancelSparkSession200Response>;
}

export interface SparkSessionResetSparkSessionTimeout {
  /** Sends a keep alive call to the current session to reset the session timeout. */
  put(
    options?: SparkSessionResetSparkSessionTimeoutParameters
  ): Promise<SparkSessionResetSparkSessionTimeout200Response>;
}

export interface SparkSessionGetSparkStatements {
  /** Gets a list of statements within a spark session. */
  get(
    options?: SparkSessionGetSparkStatementsParameters
  ): Promise<SparkSessionGetSparkStatements200Response>;
  /** Create statement within a spark session. */
  post(
    options: SparkSessionCreateSparkStatementParameters
  ): Promise<SparkSessionCreateSparkStatement200Response>;
}

export interface SparkSessionGetSparkStatement {
  /** Gets a single statement within a spark session. */
  get(
    options?: SparkSessionGetSparkStatementParameters
  ): Promise<SparkSessionGetSparkStatement200Response>;
}

export interface SparkSessionCancelSparkStatement {
  /** Kill a statement within a session. */
  post(
    options?: SparkSessionCancelSparkStatementParameters
  ): Promise<SparkSessionCancelSparkStatement200Response>;
}

export interface Routes {
  /** Resource for '/batches' has methods for the following verbs: get, post */
  (path: "/batches"): SparkBatchGetSparkBatchJobs;
  /** Resource for '/batches/\{batchId\}' has methods for the following verbs: get, delete */
  (path: "/batches/{batchId}", batchId: string): SparkBatchGetSparkBatchJob;
  /** Resource for '/sessions' has methods for the following verbs: get, post */
  (path: "/sessions"): SparkSessionGetSparkSessions;
  /** Resource for '/sessions/\{sessionId\}' has methods for the following verbs: get, delete */
  (
    path: "/sessions/{sessionId}",
    sessionId: string
  ): SparkSessionGetSparkSession;
  /** Resource for '/sessions/\{sessionId\}/reset-timeout' has methods for the following verbs: put */
  (
    path: "/sessions/{sessionId}/reset-timeout",
    sessionId: string
  ): SparkSessionResetSparkSessionTimeout;
  /** Resource for '/sessions/\{sessionId\}/statements' has methods for the following verbs: get, post */
  (
    path: "/sessions/{sessionId}/statements",
    sessionId: string
  ): SparkSessionGetSparkStatements;
  /** Resource for '/sessions/\{sessionId\}/statements/\{statementId\}' has methods for the following verbs: get */
  (
    path: "/sessions/{sessionId}/statements/{statementId}",
    sessionId: string,
    statementId: string
  ): SparkSessionGetSparkStatement;
  /** Resource for '/sessions/\{sessionId\}/statements/\{statementId\}/cancel' has methods for the following verbs: post */
  (
    path: "/sessions/{sessionId}/statements/{statementId}/cancel",
    sessionId: string,
    statementId: string
  ): SparkSessionCancelSparkStatement;
}

export type SparkClientRestClient = Client & {
  path: Routes;
};

export default function SparkClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): SparkClientRestClient {
  const baseUrl =
    options.baseUrl ??
    `${endpoint}/livyApi/versions/{livyApiVersion}/sparkPools/{sparkPoolName}`;

  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as SparkClientRestClient;
}
