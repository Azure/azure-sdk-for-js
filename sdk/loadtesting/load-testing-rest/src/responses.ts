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
export interface CreateOrUpdateTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface CreateOrUpdateTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateTestDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteTest204Response extends HttpResponse {
  status: "204";
}

export interface DeleteTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteTestDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTest200Response extends HttpResponse {
  status: "200";
  body: TestOutput;
}

export interface GetTestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTestDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTests200Response extends HttpResponse {
  status: "200";
  body: PagedTestOutput;
}

export interface ListTestsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTestsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTestsDefaultHeaders;
}

/** The request has succeeded. */
export interface UploadTestFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface UploadTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UploadTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UploadTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTestFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface GetTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTestFileDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteTestFile204Response extends HttpResponse {
  status: "204";
}

export interface DeleteTestFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteTestFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteTestFileDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTestFiles200Response extends HttpResponse {
  status: "200";
  body: PagedFileInfoOutput;
}

export interface ListTestFilesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTestFilesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTestFilesDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface CreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestAppComponentsOutput;
}

export interface GetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface CreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface GetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestServerMetricConfigOutput;
}

export interface GetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface GetTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTestRunDefaultHeaders;
}

export interface CreateOrUpdateTestRun200Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded. */
export interface CreateOrUpdateTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
  headers: RawHttpHeaders & CreateOrUpdateTestRun200Headers;
}

export interface CreateOrUpdateTestRun201Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateOrUpdateTestRun201Response extends HttpResponse {
  status: "201";
  body: TestRunOutput;
  headers: RawHttpHeaders & CreateOrUpdateTestRun201Headers;
}

export interface CreateOrUpdateTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateTestRunDefaultHeaders;
}

/** The final response for long-running CreateOrUpdateTestRun operation */
export interface CreateOrUpdateTestRunLogicalResponse extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteTestRun204Response extends HttpResponse {
  status: "204";
}

export interface DeleteTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTestRunFile200Response extends HttpResponse {
  status: "200";
  body: FileInfoOutput;
}

export interface GetTestRunFileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTestRunFileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTestRunFileDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTestRuns200Response extends HttpResponse {
  status: "200";
  body: PagedTestRunOutput;
}

export interface ListTestRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTestRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTestRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface StopTestRun200Response extends HttpResponse {
  status: "200";
  body: TestRunOutput;
}

export interface StopTestRunDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StopTestRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StopTestRunDefaultHeaders;
}

/** The request has succeeded. */
export interface ListMetricNamespaces200Response extends HttpResponse {
  status: "200";
  body: MetricNamespaceCollectionOutput;
}

export interface ListMetricNamespacesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMetricNamespacesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMetricNamespacesDefaultHeaders;
}

/** The request has succeeded. */
export interface ListMetricDefinitions200Response extends HttpResponse {
  status: "200";
  body: MetricDefinitionCollectionOutput;
}

export interface ListMetricDefinitionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMetricDefinitionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMetricDefinitionsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListMetrics200Response extends HttpResponse {
  status: "200";
  body: PagedTimeSeriesElementOutput;
}

export interface ListMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMetricsDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrUpdateAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface CreateOrUpdateAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateAppComponentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAppComponents200Response extends HttpResponse {
  status: "200";
  body: TestRunAppComponentsOutput;
}

export interface GetAppComponentsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAppComponentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAppComponentsDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrUpdateServerMetricsConfig200Response
  extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface CreateOrUpdateServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrUpdateServerMetricsConfigDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrUpdateServerMetricsConfigDefaultHeaders;
}

/** The request has succeeded. */
export interface GetServerMetricsConfig200Response extends HttpResponse {
  status: "200";
  body: TestRunServerMetricConfigOutput;
}

export interface GetServerMetricsConfigDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetServerMetricsConfigDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetServerMetricsConfigDefaultHeaders;
}
