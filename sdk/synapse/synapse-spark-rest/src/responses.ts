// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SparkBatchJobCollection,
  SparkBatchJob,
  SparkSessionCollection,
  SparkSession,
  SparkStatementCollection,
  SparkStatement,
  SparkStatementCancellationResult
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/** List all spark batch jobs which are running under a particular spark pool. */
export interface SparkBatchGetSparkBatchJobs200Response extends HttpResponse {
  status: "200";
  body: SparkBatchJobCollection;
}

/** Create new spark batch job. */
export interface SparkBatchCreateSparkBatchJob200Response extends HttpResponse {
  status: "200";
  body: SparkBatchJob;
}

/** Gets a single spark batch job. */
export interface SparkBatchGetSparkBatchJob200Response extends HttpResponse {
  status: "200";
  body: SparkBatchJob;
}

/** Cancels a running spark batch job. */
export interface SparkBatchCancelSparkBatchJob200Response extends HttpResponse {
  status: "200";
}

/** List all spark sessions which are running under a particular spark pool. */
export interface SparkSessionGetSparkSessions200Response extends HttpResponse {
  status: "200";
  body: SparkSessionCollection;
}

/** Create new spark session. */
export interface SparkSessionCreateSparkSession200Response
  extends HttpResponse {
  status: "200";
  body: SparkSession;
}

/** Gets a single spark session. */
export interface SparkSessionGetSparkSession200Response extends HttpResponse {
  status: "200";
  body: SparkSession;
}

/** Cancels a running spark session. */
export interface SparkSessionCancelSparkSession200Response
  extends HttpResponse {
  status: "200";
}

/** Sends a keep alive call to the current session to reset the session timeout. */
export interface SparkSessionResetSparkSessionTimeout200Response
  extends HttpResponse {
  status: "200";
}

/** Gets a list of statements within a spark session. */
export interface SparkSessionGetSparkStatements200Response
  extends HttpResponse {
  status: "200";
  body: SparkStatementCollection;
}

/** Create statement within a spark session. */
export interface SparkSessionCreateSparkStatement200Response
  extends HttpResponse {
  status: "200";
  body: SparkStatement;
}

/** Gets a single statement within a spark session. */
export interface SparkSessionGetSparkStatement200Response extends HttpResponse {
  status: "200";
  body: SparkStatement;
}

/** Kill a statement within a session. */
export interface SparkSessionCancelSparkStatement200Response
  extends HttpResponse {
  status: "200";
  body: SparkStatementCancellationResult;
}
