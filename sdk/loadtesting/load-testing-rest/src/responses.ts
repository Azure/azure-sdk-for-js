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
  TestRunAppComponentsOutput,
  TestRunServerMetricConfigOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsCreateOrUpdateTest200Response
  extends HttpResponse {
  status: "200";
  body: TestOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationOperationsCreateOrUpdateTest201Response
  extends HttpResponse {
  status: "201";
  body: TestOutput;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateTestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsCreateOrUpdateTestDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationOperationsDeleteTest204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationOperationsDeleteTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsDeleteTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsDeleteTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsGetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface LoadTestAdministrationOperationsGetTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsGetTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsGetTestDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsListTests200Response extends HttpResponse {
  status: "200";
  body: PagedTestOutput;
}

export interface LoadTestAdministrationOperationsListTestsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsListTestsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsListTestsDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationOperationsUploadTestFile201Response extends HttpResponse {
  status: "201";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationOperationsUploadTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsUploadTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsUploadTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsGetTestFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestAdministrationOperationsGetTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsGetTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsGetTestFileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestAdministrationOperationsDeleteTestFile204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestAdministrationOperationsDeleteTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsDeleteTestFileDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsDeleteTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsListTestFiles200Response extends HttpResponse {
  status: "200";
  body: PagedFileInfoOutput;
}

export interface LoadTestAdministrationOperationsListTestFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsListTestFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsListTestFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponents200Response
  extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponents201Response
  extends HttpResponse {
  status: "201";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationOperationsCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface LoadTestAdministrationOperationsGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsGetAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    LoadTestAdministrationOperationsCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestAdministrationOperationsGetServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface LoadTestAdministrationOperationsGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestAdministrationOperationsGetServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestAdministrationOperationsGetServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsGetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunOperationsGetTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsGetTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsGetTestRunDefaultHeaders;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRun200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsCreateOrUpdateTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
  headers: RawHttpHeaders & LoadTestRunOperationsCreateOrUpdateTestRun200Headers;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRun201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunOperationsCreateOrUpdateTestRun201Response extends HttpResponse {
  status: "201";
  body: TestRunOutput;
  headers: RawHttpHeaders & LoadTestRunOperationsCreateOrUpdateTestRun201Headers;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsCreateOrUpdateTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsCreateOrUpdateTestRunDefaultHeaders;
}

/** The final response for long-running CreateOrUpdateTestRun operation */
export interface LoadTestRunOperationsCreateOrUpdateTestRunLogicalResponse extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface LoadTestRunOperationsDeleteTestRun204Response extends HttpResponse {
  status: "204";
}

export interface LoadTestRunOperationsDeleteTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsDeleteTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsDeleteTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsGetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface LoadTestRunOperationsGetTestRunFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsGetTestRunFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsGetTestRunFileDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsListTestRuns200Response extends HttpResponse {
  status: "200";
  body: PagedTestRunOutput;
}

export interface LoadTestRunOperationsListTestRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsListTestRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsListTestRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsStopTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface LoadTestRunOperationsStopTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsStopTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsStopTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface LoadTestRunOperationsListMetricNamespacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsListMetricNamespacesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsListMetricNamespacesDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface LoadTestRunOperationsListMetricDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsListMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsListMetricDefinitionsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsListMetrics200Response extends HttpResponse {
  status: "200";
  body: PagedTimeSeriesElementOutput;
}

export interface LoadTestRunOperationsListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsListMetricsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsCreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunOperationsCreateOrUpdateAppComponents201Response extends HttpResponse {
  status: "201";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsCreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsGetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface LoadTestRunOperationsGetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsGetAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsGetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfig201Response
  extends HttpResponse {
  status: "201";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsCreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface LoadTestRunOperationsGetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface LoadTestRunOperationsGetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface LoadTestRunOperationsGetServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & LoadTestRunOperationsGetServerMetricsConfigDefaultHeaders;
}
