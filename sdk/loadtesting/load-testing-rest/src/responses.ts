// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  TestOutput,
  PagedTestOutput,
  FileInfoOutput,
  PagedFileInfoOutput,
  TestAppComponentsOutput,
  TestServerMetricConfigOutput,
  TestRunOutput,
  PagedTestRunOutput,
  MetricNamespaceCollectionOutput,
  MetricDefinitionCollectionOutput,
  PagedTimeSeriesElementOutput,
  DimensionValueListListOutput,
  TestRunAppComponentsOutput,
  TestRunServerMetricConfigOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateTest200Response
  extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateTest201Response
  extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface LoadTestAdministrationCreateOrUpdateTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateTestDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationDeleteTest204Response
  extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationDeleteTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface LoadTestAdministrationGetTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationListTests200Response
  extends HttpResponse {
  status: "200";
  body: PagedTestOutput;
}

export interface LoadTestAdministrationListTestsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationListTestsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationListTestsDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationUploadTestFile201Response
  extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationUploadTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationUploadTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationUploadTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetTestFile200Response
  extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationGetTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationGetTestFileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationDeleteTestFile204Response
  extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationDeleteTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationDeleteTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationDeleteTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationListTestFiles200Response
  extends HttpResponse {
  status: "200";
  body: PagedFileInfoOutput;
}

export interface LoadTestAdministrationListTestFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationListTestFilesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationListTestFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateAppComponents201Response
  extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationGetServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationGetServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationGetServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunGetTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetTestRunDefaultHeaders;
}

export interface LoadTestRunCreateOrUpdateTestRun200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateTestRun200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, any>;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateTestRun200Headers;
}

export interface LoadTestRunCreateOrUpdateTestRun201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateTestRun201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, any>;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateTestRun201Headers;
}

export interface LoadTestRunCreateOrUpdateTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateTestRunDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunCreateOrUpdateTestRunDefaultHeaders;
}

/** The final response for long-running CreateOrUpdateTestRun operation */
export interface LoadTestRunCreateOrUpdateTestRunLogicalResponse
  extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestRunDeleteTestRun204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestRunDeleteTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunDeleteTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunDeleteTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestRunGetTestRunFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetTestRunFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetTestRunFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListTestRuns200Response extends HttpResponse {
  status: "200";
  body: PagedTestRunOutput;
}

export interface LoadTestRunListTestRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListTestRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListTestRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunStopTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunStopTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunStopTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunStopTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricNamespaces200Response
  extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface LoadTestRunListMetricNamespacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricNamespacesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricNamespacesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricDefinitions200Response
  extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface LoadTestRunListMetricDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricDefinitionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricDefinitionsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetrics200Response extends HttpResponse {
  status: "200";
  body: PagedTimeSeriesElementOutput;
}

export interface LoadTestRunListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunListMetricDimensionValues200Response
  extends HttpResponse {
  status: "200";
  body: DimensionValueListListOutput;
}

export interface LoadTestRunListMetricDimensionValuesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunListMetricDimensionValuesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunListMetricDimensionValuesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateAppComponents201Response
  extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestRunCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestRunCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunGetServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunGetServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunGetServerMetricsConfigDefaultHeaders;
}
